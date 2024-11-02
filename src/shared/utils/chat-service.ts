/* eslint-disable unicorn/prefer-spread,unicorn/prefer-ternary,unicorn/no-for-loop,@typescript-eslint/no-explicit-any,unicorn/prefer-top-level-await */
import { RefObject, SyntheticEvent } from 'react';

import plural from 'plural-ru';
import { UseFormSetValue } from 'react-hook-form';

import { FileUploaderElement } from '../../components/support-chat/elems/file-uploader/file-uploader.tsx';
import {
  GroupedMessages,
  MessageCore,
  MessagePublicFile,
} from '../../components/support-chat/support-chat.tsx';
import { apiRequest } from '../api/api-request.ts';
import {
  FILE_EXTENSION_PERMISSION,
  FILE_EXTENSION_PERMISSION_STRING,
} from '../constants/extensions.ts';
import { URL_REGEX } from '../constants/regex.ts';
import {
  addSendMessage,
  cancelMainLoading,
  initMainMessages,
} from '../models/chat.ts';
import { ChatFormProps } from '../types/chat.ts';
import { ApiResponse } from '../types/global.ts';
import { UploadedFile } from './file-service.ts';
import { showToast } from './show-toast.tsx';

class ChatService {
  //TODO Убрать BaseUrl

  async fetchMessages(uid: string) {
    // startMainLoading();
    //
    // const { data, error } = await apiRequest({
    //   params: { uid },
    //   url: '/messenger/view',
    // });
    //
    // if (!error) {
    //   initMainMessages(data.models);
    // }
    initMainMessages(messageModel as unknown as MessageCore[]);

    cancelMainLoading();
  }

  async onEndReached(uid: string, lastId: number) {
    // const { data, error } = await apiRequest({
    //   params: { start: lastId, uid },
    //   url: '/messenger/view',
    // });
    //
    // if (!error) {
    //   composeMainMessage(data.models);
    // }
  }

  async sendMessage(
    params: any,
    data: ChatFormProps,
  ): Promise<ApiResponse<MessageCore>> {
    const formData = this.buildFormData(data);

    const response = await apiRequest({
      data: formData,
      method: 'POST',
      params,
      url: '/messenger/create-message',
    });

    if (!response.error) {
      addSendMessage(response.data);
    }

    return response;
  }

  setPositionInGroup(messages: MessageCore[]) {
    const result: MessageCore[][] = [];
    const currentGroup: MessageCore[] = [];
    let previousMessage = null;

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const isLastInGroup =
        previousMessage === null || message.isMy !== previousMessage.isMy;
      const isFirstInGroup =
        i === messages.length - 1 || message.isMy !== messages[i + 1].isMy;

      currentGroup.push({
        ...message,
        firstInGroup: isFirstInGroup,
        lastInGroup: isLastInGroup,
      });

      previousMessage = message;
    }

    result.push(currentGroup.reverse());

    return result.flat();
  }

  createArrayMessages(
    object: Record<string, MessageCore[]>,
  ): GroupedMessages[] {
    return Object.entries(object).map(([date, messages]) => ({
      date,
      messages: this.setPositionInGroup(messages),
    }));
  }

  groupByDate(messages: MessageCore[]) {
    return this.createArrayMessages(
      messages.reduce(function (acc: Record<string, MessageCore[]>, obj) {
        const property = obj.mainDate;

        acc[property] = acc[property] || [];
        acc[property].push(obj);

        return acc;
      }, {}),
    );
  }

  addScrolled(e: Event) {
    const container = e.target as HTMLDivElement;

    if (Math.abs(container?.scrollTop) > 10) {
      container.classList.add('scrolled');
    } else {
      container.classList.remove('scrolled');
    }
  }

  goToDownChat(ref: RefObject<HTMLDivElement>) {
    if (!ref.current) return;

    ref.current.scrollTop = 0;
  }

  openUploader(uploader?: RefObject<FileUploaderElement>) {
    if (!uploader || !uploader.current) return;

    uploader.current.showUploader();
  }

  resetUploader(uploader: RefObject<FileUploaderElement>) {
    if (!uploader.current) return;

    uploader.current.reset();
  }

  resetMainField(editor?: RefObject<HTMLDivElement>) {
    function removed(node: HTMLDivElement) {
      node.innerHTML = '';
      node.classList.remove('dirty');
      node.blur();
    }

    if (!editor) {
      const editorNode =
        document.querySelector<HTMLDivElement>('.chat-main-field');

      if (editorNode) {
        removed(editorNode);

        return;
      }
    }
    if (!editor || !editor.current) return;

    removed(editor.current);
  }

  togglePlaceholder(editor: HTMLDivElement, value: string) {
    if (value) {
      editor.classList.add('dirty');
    } else {
      editor.classList.remove('dirty');
    }
  }

  onImageLoad(event: SyntheticEvent<HTMLImageElement>) {
    event.currentTarget.classList.add('loaded');
  }

  getUploadedFiles(
    oldFiles: UploadedFile[],
    newFiles: FileList,
  ): UploadedFile[] {
    let fileList: UploadedFile[] = [];

    const newFormattedFiles = this.createFormattedFiles(newFiles);

    if (Array.isArray(oldFiles)) {
      fileList = [...oldFiles, ...newFormattedFiles];
    } else {
      fileList = Array.from(newFormattedFiles);
    }

    return fileList;
  }

  createFormattedFiles(files: FileList): UploadedFile[] {
    if (!files) return [];

    const filesArray = Array.from(files);
    const result: UploadedFile[] = [];
    const errorsFilesList: string[] = [];

    for (let i = 0; i < filesArray.length; i++) {
      const parsedFile = new UploadedFile(filesArray[i], this.generateId(i));

      if (FILE_EXTENSION_PERMISSION.has(parsedFile.extension)) {
        result.push(parsedFile);
      } else {
        errorsFilesList.push(parsedFile.name);
      }
    }

    if (errorsFilesList.length) {
      showToast({
        message: `Некоторые файлы были не загруженны из-за их расширений: ${JSON.stringify(
          errorsFilesList.join(', '),
        )}. Допустимые расширений: ${FILE_EXTENSION_PERMISSION_STRING}`,
        options: {
          duration: 7500,
        },
        type: 'error',
      });
    }

    return result;
  }

  generateId(num: number) {
    return Date.now() + (num + 1);
  }

  buildUploadModalTitle(files: UploadedFile[]): string {
    if (!files || !files.length) return 'Прикрепленные файлы';

    const titles: [string, string, string] = [
      '%d файл',
      '%d файла',
      '%d файлов',
    ];

    if (files.every(({ isImage }) => isImage)) {
      titles[0] = '%d изображение';
      titles[1] = '%d изображения';
      titles[2] = '%d изображений';
    }

    return `Отправить ${plural(files.length, ...titles)}`;
  }

  removeFile(
    uid: number,
    files: UploadedFile[],
    updater: UseFormSetValue<ChatFormProps>,
  ) {
    const newFiles = files.filter((file) => file.uid !== uid);

    updater('files', newFiles);
  }

  buildFormData({ message, files }: ChatFormProps) {
    const formData = new FormData();

    formData.append('message', message);

    for (const file of files) {
      formData.append('files[]', file.toFile());
    }

    return formData;
  }

  async onFileDownload({
    publicLink,
    name,
  }: Pick<MessagePublicFile, 'publicLink' | 'name'>) {
    const image = await fetch(publicLink);

    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement('a');

    link.href = imageURL;
    link.download = name;
    document.body.append(link);
    link.click();
    link.remove();
  }

  showMessageDropdown(ref?: RefObject<HTMLDivElement>) {
    if (!ref || !ref.current) return;
    ref.current.classList.add('active');
  }

  hideMessageDropdown(ref?: RefObject<HTMLDivElement>) {
    if (!ref || !ref.current) return;
    ref.current.classList.remove('active');
  }

  checkLinks(message: string) {
    function checkByProtocol(url: string) {
      const checkRegex = /(http|https|www|ftp)/;

      if (!checkRegex.test(url)) return '//' + url.trim();

      return url.trim();
    }

    if (!message) return '';
    const dateRegex = /(\d+\.\d+\.\d+)/;

    return message.replace(URL_REGEX, (url) => {
      if (dateRegex.test(url)) return url;

      return `<a target="_blank" onclick="event.stopPropagation()" href='${checkByProtocol(
        url,
      )}'>${url}</a>`;
    });
  }
}

export const chatInstance = new ChatService();

const messageModel = [
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:28',
    date: '21.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '21.05.2024 17:28',
        extension: 'txt',
        height: null,
        id: 975_280,
        isDeleted: false,
        name: 'Запрос на удаление данных_664caf938756f_789',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=_rnLXZiRiZQSCkt0wCgRsyy-QIj_uWVmksevsYC_ez2R3kZcAslxTsw27yT6HxWBN1v8f5KKGqZ0sUxkf2rPDpFVD6h1lTV13a-l9XslMm3yHLM3LxxrzrmB2PmLoZxZyBwLR6Xp7_AdLzKBimqjePTs-Mr5M6JV75ifNgWC6VJAhraaQbe0pVKldP3yrgg65pO9hOluyYGlpieXaRpGPwHYJrjscJXdoeV4GrjlSM-AjHPO8KVvDZ9F3JI3Kdb',
        size: 535,
        width: null,
      },
    ],
    homeWork: null,
    id: 3_818_800,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '21 мая',
    message: null,
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: 70,
    createdAt: '16:57',
    date: '21.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '21.05.2024 16:57',
        extension: 'txt',
        height: null,
        id: 975_279,
        isDeleted: false,
        name: 'Запрос на удаление данных_664ca861452b4_123',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=zZy7ZCjw4QiATkw8OXeZaDvK8VTDpW40Mc9dKFddyiFiqHS2ZWQKCsNLuIUrCljRvvZIDwtJZI_eCLJ9mcY3xQv-HMLH7q2ls6l6UF51ayvP1C52bkbNBuXrJlmpWh_IHzUxgTnCA2ZK75_ZShft9x7TmcZKdUKcC7svJU992HMGxCkLdwQUV5dLttMmem-JMeCcsFhUOyooZl0pZ6PATFGNb3xCVBAhzMl4-bDb5XVQSPG3fZTfuGIRQ-YgAl2',
        size: 535,
        width: null,
      },
    ],
    homeWork: null,
    id: 3_818_799,
    isDeleted: false,
    isMy: false,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '21 мая',
    message: null,
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: false,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: {
      '99ballov': false,
      avatar: 'https://lk.99ballov.wocom.biz/lk/imgs/users/default.png',
      bowedShortName: 'Лиана Тимеркаева',
      id: 8987,
      'online-curator': false,
      subject: null,
      support: false,
    },
    userStudent: null,
    user_id: 8987,
    viewedAt: '21.05.2024 16:58',
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:35',
    date: '20.05',
    exam: null,
    file: null,
    files: [],
    homeWork: null,
    id: 3_818_611,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'Msg my',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:32',
    date: '20.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '20.05.2024 17:32',
        extension: 'jpg',
        height: 1024,
        id: 975_271,
        isDeleted: false,
        name: '23-fev-3_664b5ef090cea_224',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=JMCiSiMr6mWU2wj-s_7Eo-_rTeR_b9ioTDhHA3VfeOClGh_EfCd5iIxFgR3zBb13kAQv2kqBn0dCeYqHlxD0f69mnctreTWZ1yu4HYt5sgeWHT1MsDqTMpPzwYWfKdRt7v984xkNPd6PlTswmKTVApZDFqbibkkf-jqbJOzeeloPPUNfV3cwQf37r_v_P_w6V5dCX8TbY9DLGSuPy7DXH6cO5DiUtEZiBWYb64k_GNB5SRixcU--tcU3EKarQ4i',
        size: 145_077,
        width: 1024,
      },
    ],
    homeWork: null,
    id: 3_818_610,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'nn',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:32',
    date: '20.05',
    exam: null,
    file: null,
    files: [],
    homeWork: null,
    id: 3_818_609,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'te',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:29',
    date: '20.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '20.05.2024 17:29',
        extension: 'jpg',
        height: 1024,
        id: 975_270,
        isDeleted: false,
        name: '23-fev-3_664b5e55c9417_206',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=ft9Bdx3vCbDzW2oQ9PLjGmtEY8Kej0d8ZKwYlkcNw0BVKVb9bARDNL12xUIKoWAOhA0e0SF5mvAkYRtmuqBmfqAnKHq0yqlF404TgZ9nm2xxgxB_Q76rvMy7c0ykODlYfQDjiCecWvRMWoYpO2oGu_uLVjPb4zdJVtCmUkkgohSXZ9BcTCg7IL7LTgkajibx7stRbJgq1Am39ZBsNESxzLFvMqv4ud0RilcHfjHHfC8N3drdY5pJKA9M66X8JJ5',
        size: 145_077,
        width: 1024,
      },
    ],
    homeWork: null,
    id: 3_818_608,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'vvc',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:28',
    date: '20.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '20.05.2024 17:28',
        extension: 'jpg',
        height: 1024,
        id: 975_269,
        isDeleted: false,
        name: '23-fev-3_664b5e1926078_933',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=euhttoGeZFHUWvKNsYo-g2IoxeYAoaSlVMvjmSaRbc5d4xe7gdYm4i9w94bBC3tRBXKPEICScxsFRpqbiRwE3IxLk5Fu9vVkh0CLbVk_P0KQF9Y86ugg5OpRaXcXcYd-r1vIlCp5z51Ue3G54M45raYUXy9MIaellGEqT4k0u_W81kKRID36TDKWkEi28RfBfBBr5KinZ9c11dX2ZGaO6VPNVFhtv7WAPmjPc2Rox0D1s7K5tyrX34EwTbmaHTy',
        size: 145_077,
        width: 1024,
      },
    ],
    homeWork: null,
    id: 3_818_607,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'vvv',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:28',
    date: '20.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '20.05.2024 17:28',
        extension: 'jpg',
        height: 1024,
        id: 975_268,
        isDeleted: false,
        name: '23-fev-3_664b5df20410d_160',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=ewL2OFG3QJFnIG06Q8N4q1AYKrLd7UliZksN4aCc62K_Kw9zkGAek2U9kqFWAjjzB59FtOfmczyD93tg9S2jQji04K2LOgFGEH2UuR0x60rEsYLJfNX37bcBZMWnafToRQEnwR7wzDf6o3cKjAKJrwLWyF4A8sFI0cED2BLmSoLFZLt961t_nWps2tpXbiU4sYI6TbQRjoK7R05_qtXPl6LAPMCRSSRkMBd7TcE-LP_n6m_1ot-Yu9BqWZhPgfw',
        size: 145_077,
        width: 1024,
      },
    ],
    homeWork: null,
    id: 3_818_606,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'Test removing',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:27',
    date: '20.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '20.05.2024 17:27',
        extension: 'jpg',
        height: 1024,
        id: 975_267,
        isDeleted: false,
        name: '23-fev-3_664b5dbeb7fac_785',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=m--g39zuHuetNZVrPp1fHGsTAbKKdEiHz_pFhZtV6SV1Gpk7URpsZMuP93hFql7FycC6R9QDBqWNNnqqKCyqWLIaZCPKqjY0WxeYk1y-hUmNzayimTg8uizYNsNArkPH1E_pguorgXx-1S6NKB6z-oqTa8eH7fXCJs3V3HRBlHPvIxI30ceqvMTaBHhdGve6JCBJz_bExwukRWJ-REw1TUeR1_bI0CFdX5neZIJY-SbZcqScVvr0Nqqm6h_wUdT',
        size: 145_077,
        width: 1024,
      },
    ],
    homeWork: null,
    id: 3_818_605,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'Test',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:17',
    date: '20.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '20.05.2024 17:17',
        extension: 'jpg',
        height: 1024,
        id: 975_266,
        isDeleted: false,
        name: '23-fev-3_664b5b872eeff_471',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=absDz5fktQrWVXBzS_CDptX9u667TgS0zCwj-5AH8PgyfiEq-Wv7RSYGo2Z1YfYejxoE4Bq6mn_6Sc3COPHMTamohbMqhadf7ujoSQKwoDeS3SdOlO4AbRgcbLTPxIwu5buTzC5_gWgEHP02UDMhZBOXQAKemqvpWcJEthl6lVE98p27aPnqsoXaoA-u-eQTrx_sBzIabJgwdtMAGqLgjtbUO-ZauGyOTwVg8kpZgxJbl5OGGt5cwtaFQu8c_-F',
        size: 145_077,
        width: 1024,
      },
    ],
    homeWork: null,
    id: 3_818_604,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'fdf',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:12',
    date: '20.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '20.05.2024 17:12',
        extension: 'jpg',
        height: 1024,
        id: 975_265,
        isDeleted: false,
        name: '23-fev-3_664b5a58e874a_101',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=3acGSOL4mscb0DMxFqrNOgJKy0Kz4TpJlhU2VtXztEd1Ea4rSgglZ63jYr6pcvjZHFfENKs9rsA9sFLu7Wvt53FlhQ_TRT27CVbsPnXFxqX_XONeNRL6EnBBQHTqNQDTjjVrBV1Hu46cIVJfhwxX4EhfFLcvxm2HppMHuTyRZRrNbqmn3RRtflMOE9hoHhZ679Vz9RTdDNgl3k-9yioXCcMbKfvEKHq7jwrqUfB-rzuRw6Qg3lcFWzW5l-f0vrT',
        size: 145_077,
        width: 1024,
      },
    ],
    homeWork: null,
    id: 3_818_603,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'With image 23',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:11',
    date: '20.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '20.05.2024 17:11',
        extension: 'jpg',
        height: 1024,
        id: 975_264,
        isDeleted: false,
        name: '23-fev-3_664b5a18cda66_492',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=CDTvJ1ovdPelnx8CXeHww7UzSB7Z-z2aZQJ2NH64V7epj4_ucyGBh4pROD7oTxUIDb3Nm-9vskLcWSCbCtcw2FSCPh6WNWPIN295KJUNRjCu8doC4-kU0oxguawvWBXVF_K5nkBxf5l7Sdp1kIb3NdJcMcUQ2oX8yds0v97XdrWP206-IrFbGnDzjwZ8R0iAA_88_pNMmI1WkXT-3gwU8JQzNxXMDsEX6GFNNXBOxf1MIcNlj6rQmVgHe55UlM8',
        size: 145_077,
        width: 1024,
      },
    ],
    homeWork: null,
    id: 3_818_602,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: null,
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '17:05',
    date: '20.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '20.05.2024 17:05',
        extension: 'jpg',
        height: 166,
        id: 975_260,
        isDeleted: false,
        name: 'msg1022397772-174519.000004_664b58ab97321_280',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=6cfZJPNmz0J2pmyvSePdLK8dLCVl0deNVcKscfsBUXmFulr51mhfN-nAEDzDW7pTuevxKXe5XW8-TOzUYgEUVFSeGwYgV3DIT4eE4LXyJ0ABQ_Qg89rJZBPVvZdvTf1yRzgJVTQvFxfWnhD8wlZGJckwE1MfbdsQ9cMosO9n3T1GD3kq791elfqLsrmARQM77MM9hn8tu0H4QkwgAMdYFhCAYJwkGNqg0NlmJmPDcejodqFd9g2skzfIwtx4N7b',
        size: 1088,
        width: 310,
      },
    ],
    homeWork: null,
    id: 3_818_598,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: null,
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '16:35',
    date: '20.05',
    exam: null,
    file: null,
    files: [],
    homeWork: null,
    id: 3_818_596,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'Test img',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '16:34',
    date: '20.05',
    exam: null,
    file: null,
    files: [],
    homeWork: null,
    id: 3_818_595,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'test',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '11:10',
    date: '20.05',
    exam: null,
    file: null,
    files: [],
    homeWork: null,
    id: 3_818_582,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'te',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '11:02',
    date: '20.05',
    exam: null,
    file: null,
    files: [],
    homeWork: null,
    id: 3_818_581,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '20 мая',
    message: 'asdasd',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '23:16',
    date: '19.05',
    exam: null,
    file: 1,
    files: [
      {
        audioDuration: null,
        createdAt: '19.05.2024 23:16',
        extension: 'jpg',
        height: 1024,
        id: 975_253,
        isDeleted: false,
        name: '23-fev-3_664a5e1c7182a_118',
        publicLink:
          'https://lk.99ballov.wocom.biz/file?uuid=Gxq_XZ8fvr8l0PeT-6_Ww6DFSYSpUL8ciHzrkrEHMOJiDp9zGjn4fBoFNhPJWa2C2aWNJguJQbxsS90AN9fRg-wJBkuI-GJZRRIv5Hey4eoneMrGl5Lz-QIttXdccvfowuAWM0OZBUr41JrEGmeMAoX9c_sG4-8h8e_9ZKhnlPTm1mJd8EVQfTuIClnKFxotGuVmuPatSUfvXD88Mgw2P9xZbbiAtaATSspFH7e2sajJXHIXijhDNDNj_o79Bfw',
        size: 145_077,
        width: 1024,
      },
    ],
    homeWork: null,
    id: 3_818_569,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '19 мая',
    message: 'With file',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: null,
    createdAt: '23:12',
    date: '19.05',
    exam: null,
    file: null,
    files: [],
    homeWork: null,
    id: 3_818_568,
    isDeleted: false,
    isMy: true,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '19 мая',
    message: 'Me message response',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: true,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: null,
    userStudent: {
      avatar:
        'https://lk.99ballov.wocom.biz/images/user/70/avatar.png?9eea8d12f90ef741e80760c966c0b5e1',
      bowedShortName: 'Марат Вагапов',
      id: 70,
    },
    user_id: 70,
    viewedAt: null,
  },
  {
    admin_id: 70,
    companion: 70,
    createdAt: '23:01',
    date: '19.05',
    exam: null,
    file: null,
    files: [],
    homeWork: null,
    id: 3_818_565,
    isDeleted: false,
    isMy: false,
    isRobot: false,
    is_comment: null,
    is_online_curator: null,
    mainDate: '19 мая',
    message: 'Not my mesage',
    model_id: 8987,
    online_curator_robot: null,
    permissionChange: false,
    subject: null,
    support_robot: null,
    system: null,
    time: null,
    type: 2,
    userEmployee: {
      '99ballov': false,
      avatar: 'https://lk.99ballov.wocom.biz/lk/imgs/users/default.png',
      bowedShortName: 'Лиана Тимеркаева',
      id: 8987,
      'online-curator': false,
      subject: null,
      support: false,
    },
    userStudent: null,
    user_id: 8987,
    viewedAt: '19.05.2024 23:01',
  },
];
