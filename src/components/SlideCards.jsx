

const SlideCards = ({children, bg = 'bg-red-100', zIndex='z-10', opacity ='opacity-10', top = 'top-1/10', height = 'h-1/10', pos = 'fixed', title='cardBox'}) => {
  return (
    <div className={`${bg} ${zIndex} ${opacity} ${top} ${height} ${pos} rounded-none w-full border-3 border-black`}>
        
        <h2 className= "text-2xl font-bold mb-4">{title}</h2>
        {children}


    </div>
  );
}
export default SlideCards;