import { ResponseResolver, MockedRequest, restContext } from "msw";

const result = {
  boundaryYear: 2015,
  data: [
    {
      label: "総人口",
      data: [
        {
          year: 1980,
          value: 12817,
        },
        {
          year: 1985,
          value: 12707,
        },
        {
          year: 1990,
          value: 12571,
        },
        {
          year: 1995,
          value: 12602,
        },
        {
          year: 2000,
          value: 12199,
        },
      ],
    },
    {
      label: "年少人口",
      data: [
        {
          year: 1980,
          value: 2906,
          rate: 22.6,
        },
        {
          year: 1985,
          value: 2769,
          rate: 21.7,
        },
        {
          year: 1990,
          value: 2346,
          rate: 18.6,
        },
        {
          year: 1995,
          value: 2019,
          rate: 16,
        },
        {
          year: 2000,
          value: 1728,
          rate: 14.1,
        },
      ],
    },
    {
      label: "生産年齢人口",
      data: [
        {
          year: 1980,
          value: 8360,
          rate: 65.2,
        },
        {
          year: 1985,
          value: 8236,
          rate: 64.8,
        },
        {
          year: 1990,
          value: 8144,
          rate: 64.7,
        },
        {
          year: 1995,
          value: 8048,
          rate: 63.8,
        },
        {
          year: 2000,
          value: 7595,
          rate: 62.2,
        },
      ],
    },
    {
      label: "老年人口",
      data: [
        {
          year: 1980,
          value: 1550,
          rate: 12,
        },
        {
          year: 1985,
          value: 1702,
          rate: 13.3,
        },
        {
          year: 1990,
          value: 2081,
          rate: 16.5,
        },
        {
          year: 1995,
          value: 2535,
          rate: 20.1,
        },
        {
          year: 2000,
          value: 2876,
          rate: 23.5,
        },
      ],
    },
  ],
};

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
