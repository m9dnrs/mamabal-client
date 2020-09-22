import React, { useEffect, useState } from "react";
import Mwit from "../Components/Mwit";
import { authService, dbService } from "../firebase";
import { Helmet } from "react-helmet";

interface IProfileProps {
  userObj: any | null;
  refreshUser: any;
}

interface IMyMwits {
  id: string;
}

const Profile: React.FC<IProfileProps> = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [myMwits, setMyMwits] = useState<IMyMwits[]>([]);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    dbService
      .collection("mwits")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const myMwitArr = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyMwits(myMwitArr);
      });
  }, [userObj]);
  const toggleEditing = () => setEditing((prev) => !prev);
  const onLogoutClick = () => {
    authService.signOut();
    window.location.reload();
  };
  const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
    toggleEditing();
  };
  return (
    <>
      <Helmet>
        <title>Profile | Mamabal</title>
      </Helmet>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              value={newDisplayName}
              placeholder="名前編集"
              type="text"
            />
            <input type="submit" value="アップデート" />
          </form>
          <button onClick={toggleEditing}>キャンセル</button>
        </>
      ) : (
        <>
          <button onClick={toggleEditing}>プロフィールアップデート</button>
        </>
      )}
      {myMwits.map((myMwit: any) => (
        <Mwit
          key={myMwit.id}
          mwitObj={myMwit}
          isOwner={myMwit.creatorId === userObj.uid}
        />
      ))}
      <button onClick={onLogoutClick}>Logout</button>
    </>
  );
};

export default Profile;
