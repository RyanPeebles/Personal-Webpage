

const SlideCards = ({children, bg = 'bg-red-100', zIndex='z-10', opacity ='opacity-10', top = '0px', height = 'h-1/10', pos = 'fixed', title='cardBox'}) => {
  return (
    <div className={`${bg} ${zIndex} ${opacity} ${height} ${pos} rounded-none w-full border-3 border-black`} style ={{top}}>
        
        <h2 className= "text-2xl font-bold mb-4" >{title}</h2>
        {children}


    </div>
  );
}
export default SlideCards;