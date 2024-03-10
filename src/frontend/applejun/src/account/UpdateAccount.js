import React, { useEffect, useState } from "react";
import axios from "axios";

async function UpdateAccount(selectedProfile, uploadFile) {
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
      console.log(selectedProfile);
      console.log(uploadFile);
      const profileResponse = await axios.put(
        `http://localhost:8080/profile/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(profileResponse.data.msg);
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

      console.log(accountRequest.profileImage);
      //여기까지 다시 썼고 이제 테스트해야함, pwd도 넣으면 어떻게 되는지 확인해봐야함
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

export default UpdateAccount;
