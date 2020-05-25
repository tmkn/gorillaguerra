/** @jsx jsx */
import { jsx, css, Global, SerializedStyles } from "@emotion/core";
import React, { useState, useEffect } from "react";

declare var revision: string;

export const Version: React.FC = () => {
    const style = css({
        position: "absolute",
        color: "#673AB7",
        fontFamily: "monospace",
        bottom: 0,
        right: 0
    });

    return <span css={style}>{revision}</span>;
};
