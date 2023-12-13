import React from "react";

// 超链接组件
const CustomLink = (props: {
  text?: string;
  to: string;
  icon?: React.ReactNode;
}) => {
  const { text, to, icon } = props;

  // 检查链接
  const url =
    to.startsWith("http://") ||
    to.startsWith("https://") ||
    to.startsWith("mailto")
      ? to
      : `//${to}`;

  return (
    <a
      className="flex items-center space-x-1"
      title={text}
      href={url}
      target="_blank"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
};

export default CustomLink;
