

const SlideCards = ({children, bg = 'bg-red-100', zIndex='z-10', opacity ='opacity-10', top = 'top-20', yIndex= 'bottom-full'}) => {
  return (
    <div className={`${bg} ${zIndex} ${opacity} ${top} ${yIndex}  transition-opacity duration-300 ease-in-out sticky rounded-none h-screen w-full`}>
        {children}
    </div>
  );
}
export default SlideCards;