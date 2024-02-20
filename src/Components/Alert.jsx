import PropTypes from "prop-types";
const Alert = (props) => {
  const capitalize = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (

    <div style={{height:"5vh"}}>
          {props.data && (
      <div
        className={`alert alert-${props.data.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.data.type)}</strong> : {props.data.msg}
      </div>
    )}
    </div>

  );
};
Alert.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
  }),
};

export default Alert;
