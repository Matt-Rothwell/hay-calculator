import { FC, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Input from '../Input/Input';
import styles from './Uniform.module.css';


interface UniformProps {
  callback: (result: number) => void;
}

const Uniform: FC<UniformProps> = (props) => {
  const [width, setWidth] = useState<number>();
  const [depth, setDepth] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [validated, setValidated] = useState<boolean>(false);

  // Calculate how many bales fit, and update the number to display.
  const handleCalculate = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Check form inputs are valid.
    const form = event.currentTarget;
    if (form.checkValidity() !== false) {
      if ((width || width === 0) && (depth || depth === 0) && (height || height === 0)) {
        // Calculate the area and divide by the volume of a single bale.
        let result = (width * depth * height) / (0.35 * 0.45 * 0.9);

        //Update the final result to display.
        props.callback(Math.round(result));
      }
    }

    // Show form validation
    setValidated(true);
  };

  // Reset the form
  const handleReset = (event: any) => {
    props.callback(-1);
    setValidated(false);
  };

  // Return the component.
  return <>
    <div className={styles.Uniform}>
      <Form noValidate validated={validated} onSubmit={handleCalculate} onReset={handleReset}><br />
        <Input fieldName='width' setter={setWidth} />
        <Input fieldName='depth' setter={setDepth} />
        <Input fieldName='height' setter={setHeight} />
        <Button type="submit">Calculate</Button>{' '}
        <Button type="reset" variant="danger">Clear</Button>
      </Form>
    </div>
  </>
}

export default Uniform;