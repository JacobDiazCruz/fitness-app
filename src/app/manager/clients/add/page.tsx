import Button from "@/components/global/Button";
import Container from "@/components/global/Container";
import TextField from "@/components/global/TextField";
import Header from "@/app/manager/Header";

export default function AddNewClient () {
  return (
    <div className="add-new-client">
      <Header
        pageTitle="Add New Client"
        backIcon
        backPath="/manager/clients"
        showActionButtons
      />
      <Container>
        <div className="flex gap-[20px] w-[700px]">
          <div className="w-[50%]">
            <p className="mb-2">First name</p>
            <TextField
              placeholder="First name"
              className="h-[49px]"
            />
          </div>
          <div className="w-[50%]">
            <p className="mb-2">Last name</p>
            <TextField
              placeholder="Last name"
              className="h-[49px]"
            />
          </div>
        </div>
        <div className="w-[700px] mt-7">
          <p className="mb-2">Email address</p>
          <TextField
            placeholder="e.g. johndoe@email.com"
            className="h-[49px]"
          />
        </div>
        <div className="w-[700px] mt-7">
          <p className="mb-2">Contact number</p>
          <TextField
            placeholder="xxxxxxxxx"
            className="h-[49px]"
          />
        </div>
      </Container>
    </div>
  );
}