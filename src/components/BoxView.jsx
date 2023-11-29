import './box.css'
export default function BoxView(props) {
    return (
        <>
            <div className="card p-3 text-white fs-3  " >
                <div className="card-body">
                    <h3 className="card-text">{props?.headData}</h3>
                    <p className="card-text">{props.bodyData}</p>
                    <p className="card-text">{props?.extraData}</p>
                </div>
            </div>
        </>
    )
}
