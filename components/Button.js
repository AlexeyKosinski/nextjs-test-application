import MUIButton from '@material-ui/core/Button';

const Button =  (props) => {
  const { onClick = () => {},children, ...other } = props
  return (
    <MUIButton
      variant="contained"
      type="button"
      onClick={onClick}
      {...other}
    >
      {children}
    </MUIButton>
  )
}
export default Button
