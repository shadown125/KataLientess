function Backdrop(props) {
    return <div className={`backdrop${props.currentMainNavigationState ? ' is-active' : ''}`} />
}

export default Backdrop;