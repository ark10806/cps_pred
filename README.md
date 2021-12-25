# DB
<img width="718" alt="image" src="https://user-images.githubusercontent.com/30382262/147380417-e089b275-7d85-410b-98d4-c10535ef1d34.png"></img>  
- curr_furN 테이블이 plot(시간축에 따른 데이터)에 사용됨
- relative_time은 시작시간을 0으로, 1초간격으로 증가, 저장되는 key임 → unique, sorted KEY.
- unique 키를 사용하므로 접근 시간은 O(logM).

- 또한 curr_furN의 공정이 끝나면 archive_furN로 이동됨.
- 이에 따라 공정이 10년, 20년 진행됨에 따라 DB search에 소요되는 시간복잡도를 크게 줄일 수 있음.

<img width="512" alt="image" src="https://user-images.githubusercontent.com/30382262/147380434-5ceaebf9-1d7a-40d2-a1f6-afd826ce8f3b.png"></img>  
- Client로 전달되는 데이터는 위와 같음.
- 각 데이터 (is_closed, temp, flow, press)는 client의 plot에 그려짐


# Proxy Server
<img width="512" alt="image" src="https://user-images.githubusercontent.com/30382262/147380438-1c5fccfc-22be-454d-956e-11f3448facd1.png"></img>  
- 프록시 서버는 각 열처리로부터 받은 데이터를 데이터베이스에 저장.
- **비동기 처리**를 이용하여 다중 접속 환경의 제약으로부터 자유로움
- **종단간 암호화**가 보장되는 HTTPS 통신을 이용하여 스누핑, 스푸핑 방지 ⇒ 기업 보안 유지


<img width="512" alt="image" src="https://user-images.githubusercontent.com/30382262/147380441-17df953a-1527-43ac-b5e5-2cf1a20ea22e.png"></img>    
- 전체적인 통신 프로세스는 위와 같음
- 프록시 서버는 DB, Client, 열처리로와 연결되어 중간자의 역할을 수행
- 물론 비동기처리를 지원하므로 위 구조에서 훌륭히 작동 함
