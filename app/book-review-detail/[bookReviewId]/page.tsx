import React from "react";

const page = ({ params }: pageParamsType) => {
  return <div>{params.bookReviewId}와 관련된 북 리뷰 모아놓은 상세 페이지</div>;
};

interface pageParamsType {
  params: {
    bookReviewId: string;
  };
}

export default page;
