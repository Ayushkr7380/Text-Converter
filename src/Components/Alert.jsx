

const Alert = (props) => {

    const capitalize = (word) =>{
            const lower = word.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
    }






  return (
 
    props.data && <div className={`alert alert-${props.data.type} alert-dismissible fade show`} role="alert">
        
        <strong>{capitalize(props.data.type)}</strong> : {props.data.msg}
        </div>
    
  )
}

export default Alert