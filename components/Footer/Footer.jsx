import React from "react";
import styles from "./footer.module.scss";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function Footer() {
  return (
    <div className={styles.FooterScss}>
      <p className={styles.textFooter}>Términos y condiciones</p>
      <div className={styles.iconDot}>
        <FiberManualRecordIcon />
        <FiberManualRecordIcon />
        <FiberManualRecordIcon />
        <FiberManualRecordIcon />
      </div>
    </div>
  );
}
