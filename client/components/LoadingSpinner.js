const LoadingSpinner = () => {
  return (
    <div className="LoadingSpinner">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <p className="font-bold mt-4">Loading...</p>
      <style jsx>
        {`
      .LoadingSpinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  align-items: center;
  align-self-center;
}

.lds-text {
  color: white;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
}

.lds-ripple div {
  position: absolute;
  border: 3px solid #63B3ED;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 50px;
    left: 50px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
      `}
      </style>
    </div>
  )
}

export default LoadingSpinner
