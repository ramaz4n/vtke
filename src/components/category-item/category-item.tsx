export type CategoryItemProps = {
  id: number;
  key: number;
  name: string;
  onClick: () => void;
  createdAt?: string;
  updatedAt?: string;
};

export const CategoryItem = ({ id, name, onClick }: CategoryItemProps) => (
  <div className='category-item' onClick={onClick}></div>
);
