function Backdrop(props: {currentMainNavigationState: boolean, activeTodo: boolean}) {
    return <div className={`backdrop${props.currentMainNavigationState ? ' is-active' : ''}${props.activeTodo ? ' is-active-full' : ''}`} />
}

export default Backdrop;