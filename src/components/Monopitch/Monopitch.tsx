import { FC, useState } from 'react';
import styles from './Monopitch.module.css';
import { Form, Button } from 'react-bootstrap';
import Input from '../Input/Input';

interface MonopitchProps {
  callback: (result: number) => void;
}

const Monopitch: FC<MonopitchProps> = (props) => {
  const [width, setWidth] = useState<number>();
  const [depth, setDepth] = useState<number>();
  const [rearHeight, setRearHeight] = useState<number>();
  const [frontHeight, setFrontHeight] = useState<number>();
  const [validated, setValidated] = useState<boolean>(false);

  // Calculate how many bales fit, and update the number to display.
  const handleCalculate = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Check form inputs are valid.
    const form = event.currentTarget;
    if (form.checkValidity() !== false) {
      if ((width || width === 0) && (depth || depth === 0) && (rearHeight || rearHeight === 0) && (frontHeight || frontHeight === 0)) {
        // Calculate the uniform shaped volume at the bottom
        let lowerHeight = Math.min(frontHeight, rearHeight);
        let mainVolume = (width * depth * lowerHeight);

        // Calculate the volume under the slope. Multiply by 0.8 simply estimates how much space will be unused due
        // to bales being square, and not filling the entire volume under the sloped roof.
        // Otherwise this would become a more complicated packing problem... Another time
        let heightDifference = Math.abs(frontHeight - rearHeight);
        let slopedVolume = ((width * depth * heightDifference) / 2) * 0.8;

        // Calculate the final bale count by dividing by the volume taken up by a singular bale.
        let combinedArea = mainVolume + slopedVolume;
        let result = combinedArea / (0.35 * 0.45 * 0.9)

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
    <div className={styles.Monopitch}>
      <Form noValidate validated={validated} onSubmit={handleCalculate} onReset={handleReset}><br />
        <Input fieldName='width' setter={setWidth} />
        <Input fieldName='depth' setter={setDepth} />
        <Input fieldName='front height'  setter={setFrontHeight} />
        <Input fieldName='rear height' setter={setRearHeight} />
        <Button type="submit">Calculate</Button>{' '}
        <Button type="reset" variant="danger">Clear</Button>
      </Form>
    </div>
  </>
};

export default Monopitch;
