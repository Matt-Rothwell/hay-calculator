import { FC, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Input from '../Input/Input';
import styles from './Gable.module.css';

interface GableProps {
  callback: (result: number) => void;
}


const Gable: FC<GableProps> = (props) => {
  const [width, setWidth] = useState<number>();
  const [depth, setDepth] = useState<number>();
  const [eaveHeight, setEaveHeight] = useState<number>();
  const [ridgeHeight, setRidgeHeight] = useState<number>();
  const [validated, setValidated] = useState<boolean>(false);

  // Calculate how many bales fit, and update the number to display.
  const handleCalculate = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    // Check form inputs are valid.
    const form = event.currentTarget;
    if (form.checkValidity() !== false) {
      if ((width || width === 0) && (depth || depth === 0) && (eaveHeight || eaveHeight === 0) && (ridgeHeight || ridgeHeight === 0)) {
        // Calculate the uniform shaped volume at the bottom
        let lowerArea = eaveHeight * width * depth;

        // Calculate the volume under the gable roof. Multiply by 0.75 simply estimates how much space will be unused due
        // to bales being square, and not filling the entire volume under the gable roof.
        let heightDifference = Math.abs(eaveHeight - ridgeHeight);
        let gableArea = ((heightDifference * depth * width) / 2) * 0.75;

        // Calculate the final bale count by dividing by the volume taken up by a singular bale.
        let result = (lowerArea + gableArea) / (0.35 * 0.45 * 0.9);

        //Update the final result to display.
        props.callback(Math.round(result));
      }
    }

    // Show form validation.
    setValidated(true);
  };

  // Reset the form
  const handleReset = (event: any) => {
    props.callback(-1);
    setValidated(false);
  };

  // Return the component.
  return <>
    <div className={styles.Monopitch}>
      <Form noValidate validated={validated} onSubmit={handleCalculate} onReset={handleReset}><br />
        <p>This assumes an equal ridge to eave distance.</p>
        <Input fieldName='width' setter={setWidth} />
        <Input fieldName='depth' setter={setDepth} />
        <Input fieldName='ridge height' setter={setRidgeHeight} />
        <Input fieldName='eave height' setter={setEaveHeight} />
        <Button type="submit">Calculate</Button>{' '}
        <Button type="reset" variant="danger">Clear</Button>
      </Form>
    </div>
  </>
};


export default Gable;
