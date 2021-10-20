import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  //  리액트 훅 -> 함수컴포넌트에서 usestate를 사용하기 위해서
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setUsers(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          //  비동기처리방식
          "http://192.168.0.32:8080/myportal/mysql",
        );
        setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <ul>
      {users.citys.map((user) => (
        <li key={user.cityId}>({user.city})</li>
      ))}
    </ul>
  );
}

export default Users;
