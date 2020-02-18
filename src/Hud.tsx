/** @jsx jsx */
import { jsx, css, Global, SerializedStyles } from "@emotion/core";
import React, { useState, useEffect } from "react";

export const Version: React.FC = () => {
    const style = css({
        position: "absolute",
        color: "white",
        bottom: 0,
        right: 0
    });

    return <span css={style}>todo version</span>;
};
