import { FC } from 'react';
import { FormGroup, FormLabel, FormControl, Row, Col } from 'react-bootstrap';
import styles from './Input.module.css';

interface InputProps {
  fieldName: string;
  setter: (input: number) => void;
}

// Returns a form component with a name and an input.
const Input: FC<InputProps> = (props) => {
  return <>
    <div className={styles.Input}>
    <FormGroup as={Row} className="mb-3">
        <FormLabel column sm="3">
          {props.fieldName.charAt(0).toUpperCase() + props.fieldName.slice(1)}
        </FormLabel>
        <Col>
          <FormControl type="number" min="0.0" step="0.01" placeholder={'Enter '+props.fieldName+' in metres'} onChange={e => props.setter(Number(e.target.value))} required/>
          <FormControl.Feedback type="invalid">
            Please enter a valid number.
          </FormControl.Feedback>
        </Col>
      </FormGroup>
  </div>
  </>
};

export default Input;
