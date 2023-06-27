import Button from "@/components/global/Button";
import { AddIcon } from "@/components/global/Icons";
import TextField from "@/components/global/TextField";
import FormContainer from "./FormContainer";

export default function MyServices({
  servicesList,
  setServicesList
}) {
  return (
    <FormContainer
      formTitle="My Services"
      formIcon={<svg t="1685420135846" class="m-auto icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4402" width="30" height="30"><path d="M885.333333 256H725.333333V198.4C723.2 157.866667 689.066667 128 648.533333 128h-298.666666c-40.533333 2.133333-72.533333 34.133333-72.533334 74.666667V256H138.666667C98.133333 256 64 290.133333 64 330.666667v490.666666C64 861.866667 98.133333 896 138.666667 896h746.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-490.666666c0-40.533333-34.133333-74.666667-74.666667-74.666667zM341.333333 202.666667c2.133333-6.4 6.4-10.666667 12.8-10.666667h296.533334c6.4 0 10.666667 6.4 10.666666 10.666667V256H341.333333V202.666667zM138.666667 320h746.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v128H128v-128c0-6.4 4.266667-10.666667 10.666667-10.666667z m277.333333 202.666667h192V576c0 6.4-4.266667 10.666667-10.666667 10.666667h-170.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667v-53.333333z m469.333333 309.333333h-746.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667v-298.666666h224V576c0 40.533333 34.133333 74.666667 74.666667 74.666667h170.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-53.333333H896v298.666666c0 6.4-4.266667 10.666667-10.666667 10.666667z" fill="#ffffff" p-id="4403"></path></svg>}
      formDescription="Each service will be priced individually."
    >
      <div class="mt-12">
        {servicesList.map((service: any, index: number) => (
          <div key={index} className="pb-5 flex gap-[20px] w-full">
            <div className="w-[226px]">
              <p className="dark:text-neutral-50 text-neutral-900 mb-2 text-[14px]">
                Title
              </p>
              <TextField
                value={service.title}
                onChange={(e) => {
                  setServicesList(prev => {
                    const copy = [...prev];
                    copy[index].title = e.target.value;
                    return copy;
                  })
                }}
                placeholder="e.g. Nutrition plan"
                className="h-[49px]"
              />
            </div>
            <div className="w-[350px]">
              <p className="dark:text-neutral-50 text-neutral-900 mb-2 text-[14px]">
                Description
              </p>
              <TextField
                value={service.description}
                onChange={(e) => {
                  setServicesList(prev => {
                    const copy = [...prev];
                    copy[index].description = e.target.value;
                    return copy;
                  })
                }}
                className="h-[49px]"
                placeholder="e.g. I will guide you on how to plan your meals"
              />
            </div>
            <div className="w-[90px]">
              <p className="dark:text-neutral-50 text-neutral-900 mb-2 text-[14px]">
                Price
              </p>
              <TextField
                value={service.price}
                onChange={(e) => {
                  setServicesList(prev => {
                    const copy = [...prev];
                    copy[index].price = e.target.value;
                    return copy;
                  })
                }}
                type="number"
                placeholder="Enter price"
                className="h-[49px]"
              />
            </div>
            <div>
              <p className="mb-2 invisible">Actions</p>
              {index == servicesList.length - 1 && (
                <Button 
                  onClick={() => {
                    setServicesList([...servicesList, 
                      { 
                        title: "", 
                        description: "", 
                        price: null
                      }
                    ])
                  }}
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Add a Service
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </FormContainer>
  );
}