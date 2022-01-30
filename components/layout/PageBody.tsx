import {ReactNode} from "react";

function PageBody (props: {children: ReactNode}) {
    return (
        <main>
            <div className="page-body">
                {props.children}
            </div>
        </main>
    )
}

export default PageBody;