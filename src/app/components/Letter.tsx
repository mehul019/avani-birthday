"use client";

import { useState } from "react";
import styles from "../styles/letter.module.css";

interface LetterProps {
  onClose: () => void;
}

/**
 * Letter – modal-like overlay containing a private love letter.
 * A password is required to unlock the full letter content.
 * Note: The password lives client-side for the demo and is NOT secure.
 */
export default function Letter({ onClose }: LetterProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Demo password: stored client-side for this project. For a real app,
  // authentication and secure storage would be required.
  const CORRECT_PASSWORD = "sunflower";

  const letter = [
    `Maru baby.. maru pyaaru su beautiful SUNFLOWER.. 🌻💋❤️`,
    `baby.. aa letter hu bovaj bovaj excitement thi lakhu chu.. kem ke aaje taro birthday che.. bovaj special day che aaje.. maru baby aaje janmyu no hot to maru su that.. maru cutu.. hu hamesha aa feel karto rais ke hu bovaj lucky chu..`,
    `maru bachhu.. maru sweetu.. maru guglu.. muuuuuaaaahhhhhhhhh.. 💋💋💋💋💋💋😘😘😘😘😘😘 bovaj bovaj khushi thai che.. baby hu chahu chu ke khali aaj no divas nai.. tara jeevan ma badhhaj divso aavaj special ane magical re.. hu chahu chu tari badhij wishes puri thai..`,
    `hu aa divas no ghana time thi wait karto to.. baby te mara jeevan ma bovaj badhi happiness lavi didhi che.. cutu tara mate mane badhuj karvu game che.. mane bovaj bovaj feelings che sweetu tara mate.. atyare hu atlo badho khush chu ke aa letter lakhva karta tane badhu same bolu.. ik baby tane aa gift bovaj bovaj gamse.. mai try kairu che ke tara ane amuk aapda photo memories aa app ma mukya che..`,
    `maru sweetu.. almost appan ne madya 1 varas thai gayo che.. ane aapade atla close aavi gaya che ke.. bas tara vina have hu jeevanu vicharij nathi sakto.. te mane atlu badhy pyaar aapyu che.. aapada vachhe katla badha ups and downs aavya che toh bhi aapade ek bijano sath nathi chhodyo.. sathe madine aapade badhu solve karyu che.. aapada parents na differences samjine aapde aapadi life ne beautiful banavyu che..`,
    `maru bachhu hu samju chu ke aa long distance na vajhe thi aapada vachhe ghani badhi vaar arguments thai che.. hu hamesha tarao time magto hov chu.. ane kyarek kyarek mara cutu ne hu next level tang karu chu ke mara baby ne bovaj bovaj dukh thai.. ane sav thi moti vaat mane bhulvani and vaat repeat karvani habit che.. pachi baby ne ek darr bhi besi jaai ke enu bebu ene kyare samajse ke bhi nai.. biju mai ghani badhi vaar promise bhi karyu che ke hu change karis potane.. pan hu vadhare change nathi thayo.. maru cutu.. maru sweetu.. please mane maaf karis.. hu haji efforts nakhis ane aa habit ne hu jarur sudharis..`,
    `bachhu.. tu bovaj bovaj pyaari che.. tu badhha nu dhyaan rakhe che.. maru baby toh self independent che.. badhuj kaam ene eklinej karvu hoi.. ik baby tu strong che.. te mara karta badhare face karyu che.. cutu hu farti ek chance aapva mangu chu.. mane tari badhij vaato samajvi che.. tane badhij ritne support karvu che.. taro goto person banvu che.. baby hu taro backbone banva chahu chu.. maru sweetu.. hu kyare taro saath nathi chhodvano.. hamesha tari vaat sambhadis and taro support karis..`,
    `maru guglu.. 😘😚💋❤️🫂🥰🌻💕 bas 1 month aj baki che aapada lagan ne.. mare sachhe lagan na 4 phera yaad karva che.. dharm, arth, kaam ane moksh.. ek ek vidhi mare samjine tara sathe promises leva che.. 😍 baby.. ena pachi toh aapde aakhu jeevan sathe vitavanu che.. ena pachi toh mara thi vadhare lucky koyaj nai hoi.. baby mane bovaj bovaj feelings che.. tara thi bovaj bovaj badhu pyaar karu che.. 😘🫂😚💋🤗❤️`,
    `maru cutu.. maru sweetu.. mare haji taro birthday special banavo che.. kaash hu tya hot tara pase.. baby hu chahu tu ke tu bovaj bovaj enjoy kare.. 😍💕❤️ ghanu badhu kevu che baby tane.. pan atyare aa letter ahiyaaj patavu chu.. hope maru cutu aa surprise joine ne khush thayu hoi.. mane toh atlu badhu mann thai che tane hug karvanu kiss karvanu.. 😘💋🫂🤗`,
    `Happy Birthday maru beautiful SUNFLOWER.. 🌻💋❤️`,
    `- taro cutu su sweetu su bebu.. 😘❤️`,
  ];

  const handleSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Incorrect password, please try again.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Password input section – shown when the letter is locked */}
        {!unlocked && (
          <div className={styles.passwordBox}>
            <button
              className={styles.closeBtnPassword}
              onClick={onClose}
              type="button"
            />

            <h2>Enter Password 🌻</h2>

            <form
              className={styles.passwordInputWrapper}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />

              <button type="submit" className={styles.unlockBtn}>
                ➼
              </button>
            </form>

            {error && <p className={styles.errorMsg}>{error}</p>}
          </div>
        )}

        {/* Letter content – shown blurred until the correct password unlocks it */}
        <div className={`${styles.paper} ${!unlocked ? styles.blurred : ""}`}>
          <button
            className={styles.closeBtnLetter}
            onClick={onClose}
            type="button"
          />

          <div className={styles.paperContent}>
            <div className={styles.textContent}>
              {letter.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
