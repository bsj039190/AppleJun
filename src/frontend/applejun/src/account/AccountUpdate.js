import React, { useEffect, useState } from "react";
import axios from "axios";

async function AccountUpdate(selectedProfile, uploadFile) {
  try {
    //프사 업데이트 로직
    const profileUpdateRequest = {
      fileName: uploadFile.name,
      filePath: "",
      account: selectedProfile.id,
    };
    const formData = new FormData();
    if (uploadFile !== null) {
      formData.append("file", uploadFile);
    } else {
      formData.append("file", new Blob());
    }
    if (selectedProfile !== null) {
      const id = selectedProfile.id;
      selectedProfile.id = null;
      formData.append(
        "profileImageRequest",
        new Blob([JSON.stringify(profileUpdateRequest)], {
          type: "application/json",
        })
      );
      const profileResponse = await axios.put(
        `http://localhost:8080/profile/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      const uuidAndFileName = profileResponse.data.msg;

      //Account 업데이트 로직
      //name, email, account, pwd, connection, connection, birthday, profileImage
      const accountRequest = {
        name: selectedProfile.name,
        email: selectedProfile.email,
        account: selectedProfile.account,
        pwd: "3919",
        connection: selectedProfile.connection,
        birthday: selectedProfile.birthday,
        profileImage: `src/frontend/applejun/public/profile-image/${uuidAndFileName}`,
      };
      await axios.put(
        `http://localhost:8080/account/update/${id}`,
        accountRequest,
        {
          withCredentials: true,
        }
      );

      alert("수정이 완료되었습니다!");
      return 1;
    } else {
      console.error("Selected profile is null.");
      return 0;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export default AccountUpdate;
