import React from "react";

const page = ({ params }: pageParamsType) => {
  return <div>{params.userId}의 북 리뷰 모아놓은 페이지</div>;
};

interface pageParamsType {
  params: {
    userId: string;
  };
}

export default page;
