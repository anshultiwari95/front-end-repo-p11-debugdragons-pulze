"use client";
import { useState } from "react";
import { Button } from "../../components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/dialog";
import { Input } from "../../components/input";
import FlaggIcon from "../../../icons/FlaggIcon";
import { FaPlus } from "react-icons/fa";

import { WorkspaceProps } from "../../dashboard/components/DropDown";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { fetchData } from "../../utils/axios";
export function CreatingWorkspace(props: WorkspaceProps) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [openModel, setOpenModel] = useState(false);
  const { data: session, status } = useSession();
  const userId = session?.user.id;

  const createWorkspace = async () => {
    try {
      // const response = await fetch(
      //   "http://localhost:8080/api/create-new-workspace",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       workspace_name: workspaceName,
      //       creater_id: userId,
      //     }),
      //   }
      // );

      const response = await fetchData({
        url: "/create-new-workspace",
        method: "post",
        body: JSON.stringify({
          workspace_name: workspaceName,
          creater_id: userId,
        }),
      });

      if (response) {
        // console.log("SendVideo response:", data);
        props.updateWorkspace(response.workspace);
        toast.success("workspace created successfully");
        setOpenModel(false);
      } else {
        console.error("workspace not created", response);
        toast.error("try again", response);
      }
    } catch (error: any) {
      console.error("Error creating workspace:", error);
      toast.error(error?.error);
    }
  };
  return (
    <Dialog open={openModel} onOpenChange={setOpenModel}>
      <DialogTrigger asChild>
        <span className="flex flex-row font-[Poppins] font-normal text-sm text-left justify-center items-center m-1">
          <FaPlus className="ml-0.5" />
          New Workspace
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex flex-col  items-center  rounded-lg border border-slate-500">
        <DialogHeader className=" flex flex-col justify-start    items-center ">
          {/* <div className="scale-50 mt-[-30px]  "> */}
          <div className="scale-50   ">
            <FlaggIcon />
          </div>
          <DialogTitle className="font-poppins   font-bold  text-lg absolute top-[190px]">
            Name your workspace
          </DialogTitle>
          <DialogDescription className="font-poppins font-normal text-sm text-center ">
            A workspace is shared home for you andyour coworkers to collaborate
            on pulze
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-4 items-center gap-4 ml-[12px]">
            <Input
              id="name"
              placeholder="Workspace name"
              className="col-span-3 w-[355px]"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="items-center">
          <Button
            type="submit"
            className="bg-[#8645FF] hover:bg-[#8645FF] w-[360px] rounded-r-md  font-semibold text-lg"
            onClick={createWorkspace}
          >
            Create Workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
