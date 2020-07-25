import React from 'react';
import { Slider } from "baseui/slider";
import styles from './ShareSlider.module.scss';

type Props = unknown & PropsWithClass;

const ShareSlider: React.FC<Props> = () => {
  return (
    <div className={styles.ShareSlider}>
      Share Slider
    </div>
  );
};

export default ShareSlider;
