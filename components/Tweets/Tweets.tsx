import React from "react";
import Container from "../layouts/Container";

const Tweets = () => {
  return (
    <Container>
      <div className="flex flex-col">
        <blockquote class="twitter-tweet" data-theme="dark">
          <p lang="ar" dir="rtl">
            اجازة الصيف يبغالها العاب جماعية ممتعة مثل هذي 😍{" "}
            <a href="https://t.co/nCi9X99Eo5">pic.twitter.com/nCi9X99Eo5</a>
          </p>
          &mdash; مريم المطيري (@mariamtalentt){" "}
          <a href="https://twitter.com/mariamtalentt/status/1808845158160498887?ref_src=twsrc%5Etfw">
            July 4, 2024
          </a>
        </blockquote>{" "}
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </div>
    </Container>
  );
};

export default Tweets;
