
# Database

## First draft

![](plantuml/png/database.png)

### Tables

##### User
**username** | password
--- | ---
primary key |

##### Group
**groupname** | description | adminusername
--- | --- | ---
primary key | | foreign key 👉 User


##### Interest
**interestname** | description
--- | ---
primary key | 

##### IsMemberOf
**username** | **groupname**
--- | ---
primary key | 

##### UserHasInterest
**username** | **interestname**
--- | ---
foreign key 👉 User | foreign key 👉 Interest

##### GroupHasInterest
**groupname** | **interestname**
--- | ---
foreign key 👉 Group | foreign key 👉 Interest

## Comments
- Suggestion: [UUIDs](https://www.cockroachlabs.com/blog/what-is-a-uuid/) as primary keys instead of unique names. They are [easy to generate in javascript](https://www.npmjs.com/package/uuid).
