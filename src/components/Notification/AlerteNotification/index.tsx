import React from "react";
import { Button, notification, Space } from 'antd';

const openNotificationWithIcon = (type: 'success'| 'info'|'warning'|'error', title:string, text:string) => {
    notification[type]({
      message: {title},
      description:
        {text},
    });
  };


export default openNotificationWithIcon;