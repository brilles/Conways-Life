import React from "react";
import "../styles/Footer.css";
import styled from "styled-components";
import { Github } from "styled-icons/boxicons-logos/Github";

const GithubLight = styled(Github)`
  color: #fff;
  height: 20px;
  width: 20px;
`;

export default function Footer() {
  return (
    <footer>
      <p>
        <a href="https://github.com/brilles/Conways-Life">
          <GithubLight />
        </a>{" "}
        | Made by Brian Illes
      </p>
    </footer>
  );
}
