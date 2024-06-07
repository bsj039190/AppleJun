사과승준과 이키노피오
=================

* 배포 URL : <배포는 완성되었으나 서버비 문제로 현재는 닫았습니다.>
* Test ID : GUEST는 패스워드가 필요 없습니다.
* ADMIN PW : 3919
- - -

## 프로젝트 소개
* 사과승준과 이키노피오는 배승준 이수연 커플의 데이트 기록을 위한 사이트 입니다.
* 원래 쓰는 커플앱인 "더 커플" 앱을 기본 틀로 제작했습니다.
* 지도에 함께 갔던 곳의 위치를 기록할 수 있습니다.
- - -   

## 팀 구성
* 배승준 : 백엔드, 프론트엔드, DB 개발, 서버 배포
* 이수연 : 디자인

## 1. 개발 환경

* FrontEnd : React   
* BackEnd : Spring Boot, Spring Security   
* DataBase : MySQL, AWS RDS   
* 서비스 배포 : AWS EC2

- - -

## 2. 개발 기간

* 전체 기능 개발 기간 : 2024-01-12 ~ 2024-03-17
* 디자인 개발 기간 : 2024-03-18 ~ 2024-04-04

- - -

## 3. 페이지별 기능


### [로그인]

처음에 접속하면 로그인 화면이 나타납니다.
넷플릭스 초기 화면처럼 사용자를 선택할 수 있습니다.
사용자 선택 후 비밀번호 입력으로 로그인 할 수 있습니다.
<게스트 계정은 로그인 과정없이 바로 접속합니다.>

![Login](https://github.com/bsj039190/AppleJun/assets/81723581/6c04ee86-fec9-49bb-84c4-090853476893)


### [홈화면]

배경화면은 랜덤으로 나옵니다.
홈화면에서 모든 서비스에 접속할 수 있습니다.

랜덤으로 설정되어 있는 배경화면 중 하나가 배경으로 나옵니다.
<게스트 계정은 ADMIN의 배경화면이 보입니다.>

![Home](https://github.com/bsj039190/AppleJun/assets/81723581/8287e3b0-c2f0-461c-9574-16cf909178d4)


### [프로필 수정]
프로필 사진 클릭시 프로필을 수정할 수 있습니다.

![ProfileUpdate](https://github.com/bsj039190/AppleJun/assets/81723581/9f1d1ffd-f402-4fc6-a42e-3f489578ddf9)


### [헤더]

헤더에는 현재 위치한 페이지가 어떤 기능인지 알려주고 프로필 사이의 하트를 누르면 홈화면으로 이동합니다.

![Header](https://github.com/bsj039190/AppleJun/assets/81723581/0b2726ee-2a48-4f9d-8019-16dd0c664802)



### [스토리 목록]

스토리들을 확인 할 수 있습니다.
클릭시 상세 스토리를 볼 수 있습니다.
하단의 "더보기" 를 클릭하면 이전의 스토리를 로드합니다.

![StoryList](https://github.com/bsj039190/AppleJun/assets/81723581/1e54fddd-efa3-4dbe-a8eb-b2e42320d48c)


### [상세 스토리]

스토리의 상세 정보를 볼 수 있습니다.
지도모양 좌표 목록은 그날 갔던 장소들입니다.
클릭시 해당하는 URL로 이동합니다.

수정하기 버튼을 클릭하면 스토리를 수정할 수 있습니다.

![Story](https://github.com/bsj039190/AppleJun/assets/81723581/87558fb4-452b-42f4-827d-190ce7dcfc2c)



### [스토리 작성]

스토리를 작성합니다.

![StoryWrite1](https://github.com/bsj039190/AppleJun/assets/81723581/2a1ca338-6d72-4cdb-89b5-6153a921b399)




좌표는 최대 3개까지 정할 수 있습니다.

![StoryWrite2](https://github.com/bsj039190/AppleJun/assets/81723581/82f62a03-4a66-4b24-b28f-3fd8871b983d)




사진은 최대 3개까지 업로드 할 수 있습니다.

![StoryWrite3](https://github.com/bsj039190/AppleJun/assets/81723581/11c12bc2-0fdf-4fb3-804c-522c1657f06a)




작성자는 자동으로 업로드 되고 게스트 계정은 업로드 할 수 없습니다.

![StoryWriteGuest](https://github.com/bsj039190/AppleJun/assets/81723581/007bb0d8-0369-4c0e-8201-f6a00d5f7cbb)




### [지도]

네이버 지도 API를 사용해서 방문했던 장소들을 마커로 표시합니다.
마커 마우스오버시 어느 위치인지 Info Window로 확인 가능합니다.
마커 클릭시 하단의 장소 상세정보에 상세정보가 로드됩니다.

![Map1](https://github.com/bsj039190/AppleJun/assets/81723581/5ece25ae-1a80-4c86-9b61-5814a4544c53)


<URL 이동> : 해당하는 위치의 URL을 새창으로 이동합니다.

![Map2](https://github.com/bsj039190/AppleJun/assets/81723581/c78d6997-1000-4ac0-ac10-7bcdfd2568c3)


<수정> : 모달 창을 열고 해당 좌표를 수정합니다.

![Map3](https://github.com/bsj039190/AppleJun/assets/81723581/7d0a9ac6-db93-46c1-99f5-bd3ef2dee794)


<삭제> : 해당 좌표를 삭제합니다.


<리스트로 보기> : 리스트로 정렬되어 있는 좌표 페이지로 이동합니다.



### [지도리스트]

홈화면에서 지도아이콘 밑 지도리스트, [지도] 페이지의 <리스트로 보기> 버튼으로 접근 가능합니다.
수정, 삭제가 용이하기 때문에 만들었습니다.

<수정> : [지도] 페이지와 동일합니다.
<삭제> : [지도] 페이지와 동일합니다.

![MapList](https://github.com/bsj039190/AppleJun/assets/81723581/373f8d71-ce06-4aef-b077-bbc02184493d)


### [새로운 장소]

새로운 장소를 생성합니다.

&lt;GPS변환&gt; : 버튼을 클릭하면 해당 주소의 위도, 경도 값이 입력됩니다.   

![MapCreate2](https://github.com/bsj039190/AppleJun/assets/81723581/d704067b-b93d-49cb-b5e8-05b74a950394)



&lt;URL 수정&gt; : 버튼을 클릭하면 네이버 지도에서 이름으로 기록된 검색어가 자동으로 검색됩니다.

![MapCreate1](https://github.com/bsj039190/AppleJun/assets/81723581/c4f538c1-ae80-4e6b-a04a-89427c7d3030)



### [배경화면]

메인홈 화면에서 사용 할 배경화면을 정합니다.

&lt;사진 추가하기&gt; : 새로운 배경화면을 추가합니다.

![Back1](https://github.com/bsj039190/AppleJun/assets/81723581/7fa1149f-755e-450b-9a86-cbc914cbb3c4)


![Back2](https://github.com/bsj039190/AppleJun/assets/81723581/da221be0-bb66-46a3-9667-35ec7172525e)



### **&lt;&lt;&lt; 새로운 기능이 계속해서 추가 될 예정입니다. &gt;&gt;&gt;**

- - -

## 4. 트러블 슈팅

**포스트 상세화면 사진 이슈**
> 포스트 상세화면에서 사진이 엑스박스로 뜨는 이슈가 있었다.   
> 원인은 사진의 저장 위치가 잘못되어 있었고 src 위치도 잘못되어있었다.   
> 프론트에서 위치의 시작점이 public 폴더라는 사실을 모르고 있었다...   
> 백엔드에서 저장위치와 프론트에서 로드하는 위치를 수정해서 이슈를 해결했다.

**지도 InfoWindow 이슈**
> 지도에서 마우스 오버 이벤트로 InfoWindow를 띄우려고 했으나 animation 오류가 떴다.   
> 공식문서까지 봐가면서 시도해보았지만 &lt;NaverMap&gt; 함수 안에서는 끝까지 InfoWindow가 뜨지 않았다.   
> 결국 기존의 코드를 버리고 id = "map" 방식으로 바꿔서 했다.   
> 바꾼 방식으로 하니 잘된다.

**지도 Modal 창 이슈**
> 원래 지도에서 마커를 클릭하면 상세정보와 수정, 삭제가 가능하도록 하려고 했는데 모달창이 뜨면 계속 오류가 나서 못하고 있었다.   
> 그래서 수정, 삭제 부분은 리스트로 넘겨버렸는데 방금 위에 InfoWindow 이슈를 쓰면서 '바뀐 코드에서는 가능하지 않을까..?' 하고 시도해봤더니 작동이 가능해졌다.   
> 그래서 지금 바꾼다ㅋㅋㅋㅋㅋㅋㅋ

**로그인 이슈**
> 프론트에서 로그인이 안되는 이슈가 발생했다.   
> 그래서 3000번 포트가 아니라 8080포트로 가서 로그인을 해보니 잘 되는것을 확인했다.   
> 백엔드에서 디버깅으로 BreakPoint를 걸면서 확인해 보니   
> {"account":"test3","password":"0000"}] ==> 리액트   
> [account=test3&password=0000] ==> 백엔드   
> 이처럼 각각 받는 값이 달라서 일어나는 문제인 것을 확인했다.   
> 그래서 리액트에서도 params.toString() 을 통해서 백엔드처럼 리퀘스트를 보내도록 하여 이슈를 해결했다.

**로그인 RememberMe 이슈**
> 프론트에서 로그인시 사용자를 기억하지 못해서 백엔드와 통신이 불가능한 이슈가 발생했다.   
> 이번에도 8080포트로 가서 로그인을 해보니 RememberMe 라는 버튼이 있는 것을 확인했다.
> RememberMe 버튼을 클릭하고서 로그인하니 백엔드에서    
> [account=BSJ&password=3919&remember=on] 이처럼 뒤에 remember가 붙는 것을 확인했다.   
> 그래서 프론트에서도 똑같이 파라미터를 추가해주고 다른 백엔드와 통신하는 곳에는   
> withCredentials: true 를 추가해서 RememberMe가 유효하도록 하였다.

**포스트 Request 이슈**
> 백엔드에서는 Post 생성 리퀘스트를 받을 때에 사진파일 때문에 Multipart-form 으로 받게 했다.   
> 그래서 Postman으로 테스트를 할 때 헤더에 Multipart-form 이라고 명시를 하고 했더니   
> application-JSON으로 받아야 할 다른 리퀘스트들도 form 형식으로 전달되어 리퀘스트를 받아내지 못하는 이슈가 생겼다.   
> 여러 방법을 알아보다가 포스트맨에서 리퀘스트 부분만 Application-JSON으로 바꾸는 방법을 알아내서 실행했더니 제대로 실행이 되었다.

**포스트 Request 이슈2**
> 포스트에서는 사진이 없는 파일도 생성이 가능하도록 만들었다.   
> 그랬더니 파일 리퀘스트가 존재하지 않아서 백엔드에서 받아내지 못하는 이슈가 발생했다.   
> 로그를 살펴보니 FileList 가 null 이라서 받지 않았다는 것을 확인했다.   
> 그래서 프론트에서는 FileList 가 null이면 비어있는 Blob을 보내도록 하였고   
> 백엔드에서는 if문으로 비어있는 blob을 받으면 서비스를 하지 않도록 하였다.

- - -

## 5. 프로젝트 후기

일단 확실히 예전보다 집중력이 엄청나게 상승했다.   
백엔드는 웬만한건 다 할 수 있었지만 시큐리티는 회사에서도 하다가 포기했었는데   
이제 시큐리티도 어느정도 이해했다.   
파일 업로드 부분도 잘 몰랐는데 이제는 완벽하게 알겠다.   
구글링 능력도 예전에 비해 상승했다.

백엔드는 예전부터 해오던 것들이라 코드가 깔끔하게 나왔는데   
프론트는 너무 스파게티로 짜여졌다...   
함수명도 들쑥날쑥한 함수명이 많고  useEffect도 이상하게 쓰인 것 같은 부분이 많다.

네이버지도 API가 정말 고통스러웠지만 어떻게든 해냈다.   
물론 이상하게 하긴 했지만 내 선에서는 최선이었다...   
&lt;NaverMap&gt; 이 항상 능사는 아니다. <div id="map" 이 정답일 때도 있다.

AWS는 진짜로 잘못하면 돈이 왕창 빠져나간다. 앞으로 개인 프로젝트 할때는 웬만해서는 안 쓸 것 같다...   
AWS가 이 프로젝트 중에서 제일 어려웠던 부분인것 같다.   
아무래도 아예 처음보는 부분이라 그런 것 같다.   
리눅스 문법은 정말 중요했다. 종찬띠가 지나가면서 말하던 리눅스를 안 쓸 것 같지만 나중에 쓰게 된다는 말이 절실히 생각났다...

마지막으로 앞으로는 주석달기를 생활화하고 코드를 가시성 좋게 짜는 버릇을 들여야겠다.   
지금 보니까 내가 썼는데도 잘 모르겠다...
