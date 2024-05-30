"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { action, deleteSlider } from "../actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AppComponent = () => {
  const [relativePath, setRelativePath] = React.useState<string>();

  const router = useRouter();

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <form
        action={async (formData: FormData) => {
          const res = await action(formData);

          if (res.success) {
            setRelativePath(res.relativePath);
          }
        }}
        className="flex flex-col items-center justify-center gap-3"
      >
        <Input type="file" name="file" accept="image/*" />
        <Button className="w-full" variant={"outline"}>
          Upload
        </Button>

        {relativePath && (
          <div>
            <Image
              src={`${relativePath.replace("/public", "")}`}
              alt={relativePath}
              width={1200}
              height={720}
              layout="responsive"
              objectFit="cover"
              objectPosition="center"
              className="w-40 h-40 max-w-40 max-h-40"
            />

            <p>
              <b>relativePath</b>: {relativePath}
            </p>
          </div>
        )}

        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            deleteSlider(relativePath);
            if (typeof window !== "undefined") location.reload();
          }}
          className="w-full"
        >
          Delete file {relativePath && "(absolutePath)"}
        </Button>
      </form>
    </main>
  );
};

export default AppComponent;
