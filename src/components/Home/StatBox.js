export default function StatBox({title, value}) {
  return(
    <div className='text-center text-light'>
      <h1>{value}</h1>
      <h3>{title}</h3>
    </div>
  );
}