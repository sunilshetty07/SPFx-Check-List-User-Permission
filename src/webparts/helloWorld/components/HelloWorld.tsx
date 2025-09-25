import * as React from 'react';
//import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { spfi, SPFx } from '@pnp/sp';
import { HttpClient } from '@microsoft/sp-http';
import { useEffect, useState } from 'react';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import UserSearch from './UserSearch';
import UserSearchCombo from './Combobox';

interface ILoginUser{
  Title:string;
  Email:string;
    loginName:string;
}

const HelloWorld: React.FC<IHelloWorldProps> = (props) => {
  const sp = spfi().using(SPFx(props.context));

  const [apicurrentUser, setApiCurrentUser] = useState<ILoginUser>();
  const [currentUser, setCurrentUser] = useState<{ Title: string; Email: string } | null>(null);

  useEffect(() => {
    // SPFx PnPjs current user
    const fetchCurrentUser = async () => {
      try {
        const user = await sp.web.currentUser.select("Title", "Email")();
        setCurrentUser(user);
        console.log(currentUser);
      } catch (error) {
        console.error(error);
      }
    };

    // External API / HttpClient call
    const fetchUserDetails = async () => {
      try {
        const spUserResponse = await props.context.httpClient.get(
          "/_api/web/currentuser",
          HttpClient.configurations.v1,
          { headers: { "Accept": "application/json;odata=nometadata" } }
        );
        const spUser = await spUserResponse.json();

        console.log(spUser);

        const apiResponse = await props.context.httpClient.get(
          "https://dummyjson.com/users",
          HttpClient.configurations.v1
        );
        const apiUsers = await apiResponse.json();
        setApiCurrentUser(apiUsers);
        console.log(apicurrentUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentUser();
    fetchUserDetails();
  }, []); // empty dependency array → runs only once

  return (
    <>
      {props.userDisplayName}
      <p>test</p>
      {currentUser && (
        <div>
          {currentUser.Title} : {currentUser.Email}
        </div>
      )}
      <UserSearch context={props.context} />
      <hr/>
      <UserSearchCombo context={props.context} />
    </>
  );
};

export default HelloWorld;
