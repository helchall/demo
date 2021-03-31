import React from "react";

import Tabs from "./Tabs";

export default function AppOnglet() {
  return (
    <>
      <h1>Hello I'm Aliou Diallo!</h1>

      <Tabs>
        <div title="about">
          <h3>About me</h3>
          <p>
            I'm Mamadou Aliou Diallo a.k.a alioukahere. A Web Developer (Python,
            PHP, JS, ...Web), Technical Writer, Passionate about
            entrepreneurship, writing and teaching code. Currently working on
            Kaherecode (<a href="https://www.kaherecode.com">kaherecode.com</a>
            ), an aspiring community for french developers, a web platform to
            learn and share about programming.
          </p>
        </div>
        <div title="experiences">
          <h3>My experiences</h3>
          <ul>
            <li>
              <strong>Web Full Stack Developer - Kewel (2019 - Present)</strong>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                porta, libero nec maximus varius, sapien lorem aliquet ex, quis
                faucibus odio lorem in quam.
              </p>
            </li>
            <li>
              <strong>
                Web Full Stack Developer - Qualshore (2017 - 2019)
              </strong>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                porta, libero nec maximus varius, sapien lorem aliquet ex, quis
                faucibus odio lorem in quam.
              </p>
            </li>
          </ul>
        </div>
        <div title="contact">
          <h3>Get in touch</h3>
          <p>
            <strong>Mail</strong>:{" "}
            <a href="mailto:aliou.diallo@kaherecode.com">
              aliou.diallo@kaherecode.com
            </a>{" "}
            <br />
            <strong>Adress</strong>:Dakar, Senegal
          </p>
        </div>
      </Tabs>
    </>
  );
}
