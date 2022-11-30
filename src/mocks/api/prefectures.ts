import { ResponseResolver, MockedRequest, restContext } from "msw";

const result = [
  {
    prefCode: 1,
    prefName: "北海道",
  },
  {
    prefCode: 2,
    prefName: "青森県",
  },
  {
    prefCode: 3,
    prefName: "岩手県",
  },
  {
    prefCode: 4,
    prefName: "宮城県",
  },
  {
    prefCode: 5,
    prefName: "秋田県",
  },
];

const get: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx
) => {
  return res(
    ctx.status(200),
    ctx.json({
      message: "",
      result,
    })
  );
};

export default { get };
