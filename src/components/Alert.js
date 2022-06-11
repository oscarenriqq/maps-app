
function Alert(props) {
    return (
        <div className="alert alert-danger alert-dismissible fade show mt-4" role="alert">
            <strong>Ups... an error.</strong> Check that there are no empty fields.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={props.handleCloseAlert}></button>
        </div>
    )
}

export default Alert