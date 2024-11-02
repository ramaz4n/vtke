
export default function Page({params}: {params: {id: string}}) {
  return (
    <div>
      <h1>Some news page with id {params.id}</h1>
    </div>
  );
}
