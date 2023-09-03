const Loading = () => {
    return (
        <div className="z-50 flex flex-col justify-center items-center w-screen h-screen -translate-y-12">
            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_poqmycwy.json" background="transparent" speed="1.5"  style={{"width": "300px", "height": "300px"}} loop autoplay></lottie-player>
        </div>
    )
}

export default Loading;