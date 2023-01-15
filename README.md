# Приложение для передачи медиа данных с помощью технологии WebRTC

<div>
  <a>
    <img src="https://img.shields.io/badge/-WebRTC-black?logo=WebRTC&logoColor=1DA1F2&style=for-the-badge&logoWidth=30" />
  </a>
</div>

## Описание

Приложение реализует интерфейс сигнального сервера для установки peer-to-peer соединения с помощью протокола WebRTC в браузере.

## Источник 

Алгоритм сигнального сервера и клиета взят из репозитория [tlk](https://github.com/vasanthv/tlk).

Проблемы источника:
* Клиент использует vue.js и socket.io из глобальных переменных;
* Сигнальный сервер использует глобальные переменные для группировки пиров по каналам;
* Слабая типизация сигнального сервера и полное отсутствие типизации клиентаю

## Установка

```bash
$ yarn install
```

## Запуск

```bash
$ yarn copy:envs
$ yarn build
$ yarn start
```

## Разработка

```bash
$ yarn copy:envs
$ yarn start:dev
```

## Диаграмма классов

<details>
  <summary>Диаграмма классов</summary>

```uml
@startuml
package Client {
  class App {
    +handleConnectEvent()
    +handleDisconnectEvent()
    +handleJoinEvent()
    +handleAddPeerEvent()
    +handleSessionDescriptionEvent()
    +handleIceCandidateEvent()
    +handleRemovePeerEvent()
    - - -
    +attachMediaStream()
    +setupLocalMedia()
    +resizeVideos()
    +calcViewPortUnit()
  }
  
  note right of App::handleJoinEvent
  * передает данные о пользователе;
  * устанавливает соединение.
  end note
  
  note right of App::handleAddPeerEvent
  * получает список кандидатов для отправки офера.
  end note
  
  note right of App::handleSessionDescriptionEvent
  * получает описание сессии для установки соединения.
  end note
  
  note right of App::handleIceCandidateEvent
  * получает список ICE кандидатов для установки соединения.
  end note
  
  note right of App::handleRemovePeerEvent
  * удаляет пользователя из звонка.
  end note
  
  note right of App::attachMediaStream
  * добавляет медиа данные для отправки.
  end note
}

package Domain {
  class SignalingModule {
    +handleConnectionEvent()
    +handleJoinEvent()
    +handleUpdateUserDataEvent()
    +handleRelayICECandidate()
    +handleRelaySessionDescription()
    +handleDisconnectEvent()
  }
  
  note left of SignalingModule::handleJoinEvent
  * cохраняет информацию о пользователе;
  * добавляет пользователя в канал для звонка.
  end note
  
  note left of SignalingModule::handleUpdateUserDataEvent
  * обновить информацию о пользователе.
  end note
  
  note left of SignalingModule::handleRelayICECandidate
  * обработать пару активных ICE кандидатов.
  end note
  
  note left of SignalingModule::handleRelaySessionDescription
  * обработать описание сессии.
  end note
  
  note left of SignalingModule::handleDisconnectEvent
  * удалить пользователя из звонка.
  end note
}

package Infrastructure {
  class LoggerModule {
    +info()
    +error()
    +warn()
    +debug()
  }
  
  class WebsocketModule {
    +server
  }

  class ConfigModule {
    +getPort()
    +getApiPrefix()
    +getSwagger()
  }

  class StaticModule {
  }

  note bottom of LoggerModule
  Модуль отвечает за логирование HTTP
  запросов и WebSocket событий.
  end note
  
  note bottom of ConfigModule
  Модуль сборщик
  конфигурации приложения.
  end note
  
  note bottom of StaticModule
  Модуль раздает статику для работы 
  клиентской части приложения.
  end note
  
  note left of WebsocketModule
  Инкапсулирует логику работы 
  с WebSocket в приложении.
  end note
}

diamond Websocket


SignalingModule o- - LoggerModule
SignalingModule o- - WebsocketModule
WebsocketModule o- - ConfigModule
App - - Websocket : Websocket
Websocket - - SignalingModule : Websocket
@enduml
```
</details>

<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" contentStyleType="text/css" height="1139px" preserveAspectRatio="none" style="width:1171px;height:1139px;background:#FFFFFF;" version="1.1" viewBox="0 0 1171 1139" width="1171px" zoomAndPan="magnify"><defs/><g><!--MD5=[406b65fecc21e832f7a9b6ebadc6dce1]
cluster Client--><g id="cluster_Client"><path d="M390.5,6 L436.5,6 A3.75,3.75 0 0 1 439,8.5 L446,28.2969 L1161.5,28.2969 A2.5,2.5 0 0 1 1164,30.7969 L1164,281.5 A2.5,2.5 0 0 1 1161.5,284 L390.5,284 A2.5,2.5 0 0 1 388,281.5 L388,8.5 A2.5,2.5 0 0 1 390.5,6 " fill="none" style="stroke:#000000;stroke-width:1.5;"/><line style="stroke:#000000;stroke-width:1.5;" x1="388" x2="446" y1="28.2969" y2="28.2969"/><text fill="#000000" font-family="sans-serif" font-size="14" font-weight="bold" lengthAdjust="spacing" textLength="45" x="392" y="20.9951">Client</text></g><!--MD5=[121a8bf1197281ab89ed693fab589f94]
cluster Domain--><g id="cluster_Domain"><path d="M8.5,434 L67.5,434 A3.75,3.75 0 0 1 70,436.5 L77,456.2969 L672.5,456.2969 A2.5,2.5 0 0 1 675,458.7969 L675,673.5 A2.5,2.5 0 0 1 672.5,676 L8.5,676 A2.5,2.5 0 0 1 6,673.5 L6,436.5 A2.5,2.5 0 0 1 8.5,434 " fill="none" style="stroke:#000000;stroke-width:1.5;"/><line style="stroke:#000000;stroke-width:1.5;" x1="6" x2="77" y1="456.2969" y2="456.2969"/><text fill="#000000" font-family="sans-serif" font-size="14" font-weight="bold" lengthAdjust="spacing" textLength="58" x="10" y="448.9951">Domain</text></g><!--MD5=[9ddaf8ee8bcae11a9a9232f969198262]
cluster Infrastructure--><g id="cluster_Infrastructure"><path d="M109.5,709 L220.5,709 A3.75,3.75 0 0 1 223,711.5 L230,731.2969 L906.5,731.2969 A2.5,2.5 0 0 1 909,733.7969 L909,1129.5 A2.5,2.5 0 0 1 906.5,1132 L109.5,1132 A2.5,2.5 0 0 1 107,1129.5 L107,711.5 A2.5,2.5 0 0 1 109.5,709 " fill="none" style="stroke:#000000;stroke-width:1.5;"/><line style="stroke:#000000;stroke-width:1.5;" x1="107" x2="230" y1="731.2969" y2="731.2969"/><text fill="#000000" font-family="sans-serif" font-size="14" font-weight="bold" lengthAdjust="spacing" textLength="110" x="111" y="723.9951">Infrastructure</text></g><!--MD5=[335f4d9be48430461c68bf6d6fdba145]
class App--><g id="elem_App"><rect codeLine="2" fill="#F1F1F1" height="227.2656" id="App" rx="2.5" ry="2.5" style="stroke:#181818;stroke-width:0.5;" width="256" x="404" y="41"/><ellipse cx="514.25" cy="57" fill="#ADD1B2" rx="11" ry="11" style="stroke:#181818;stroke-width:1.0;"/><path d="M517.2188,62.6406 Q516.6406,62.9375 516,63.0781 Q515.3594,63.2344 514.6563,63.2344 Q512.1563,63.2344 510.8281,61.5938 Q509.5156,59.9375 509.5156,56.8125 Q509.5156,53.6875 510.8281,52.0313 Q512.1563,50.375 514.6563,50.375 Q515.3594,50.375 516,50.5313 Q516.6563,50.6875 517.2188,50.9844 L517.2188,53.7031 Q516.5938,53.125 516,52.8594 Q515.4063,52.5781 514.7813,52.5781 Q513.4375,52.5781 512.75,53.6563 Q512.0625,54.7188 512.0625,56.8125 Q512.0625,58.9063 512.75,59.9844 Q513.4375,61.0469 514.7813,61.0469 Q515.4063,61.0469 516,60.7813 Q516.5938,60.5 517.2188,59.9219 L517.2188,62.6406 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="27" x="534.75" y="61.8467">App</text><line style="stroke:#181818;stroke-width:0.5;" x1="405" x2="659" y1="73" y2="73"/><ellipse cx="415" cy="86.6484" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="155" x="424" y="89.9951">handleConnectEvent()</text><ellipse cx="415" cy="102.9453" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="175" x="424" y="106.292">handleDisconnectEvent()</text><ellipse cx="415" cy="119.2422" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="120" x="424" y="122.5889">handleJoinEvent()</text><ellipse cx="415" cy="135.5391" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="155" x="424" y="138.8857">handleAddPeerEvent()</text><ellipse cx="415" cy="151.8359" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="230" x="424" y="155.1826">handleSessionDescriptionEvent()</text><ellipse cx="415" cy="168.1328" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="186" x="424" y="171.4795">handleIceCandidateEvent()</text><ellipse cx="415" cy="184.4297" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="185" x="424" y="187.7764">handleRemovePeerEvent()</text><line style="stroke:#181818;stroke-width:1.0;" x1="405" x2="659" y1="195.0781" y2="195.0781"/><ellipse cx="415" cy="208.7266" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="143" x="424" y="212.0732">attachMediaStream()</text><ellipse cx="415" cy="225.0234" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="126" x="424" y="228.3701">setupLocalMedia()</text><ellipse cx="415" cy="241.3203" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="99" x="424" y="244.667">resizeVideos()</text><ellipse cx="415" cy="257.6172" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="124" x="424" y="260.9639">calcViewPortUnit()</text></g><path d="M695.5,41.5 L695.5,57.6328 L544,117.7422 L695.5,65.6328 L695.5,81.7656 A0,0 0 0 0 695.5,81.7656 L966.5,81.7656 A0,0 0 0 0 966.5,81.7656 L966.5,51.5 L956.5,41.5 L695.5,41.5 A0,0 0 0 0 695.5,41.5 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M956.5,41.5 L956.5,51.5 L966.5,51.5 L956.5,41.5 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="707" cy="54.1328" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="239" x="712.5" y="58.5669">передает данные о пользователе;</text><ellipse cx="707" cy="69.2656" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="193" x="712.5" y="73.6997">устанавливает соединение.</text><path d="M695.5,91.7656 L695.5,100.332 L579,134.0391 L695.5,108.332 L695.5,116.8984 A0,0 0 0 0 695.5,116.8984 L1080.5,116.8984 A0,0 0 0 0 1080.5,116.8984 L1080.5,101.7656 L1070.5,91.7656 L695.5,91.7656 A0,0 0 0 0 695.5,91.7656 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M1070.5,91.7656 L1070.5,101.7656 L1080.5,101.7656 L1070.5,91.7656 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="707" cy="104.3984" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="353" x="712.5" y="108.8325">получает список кандидатов для отправки офера.</text><path d="M695.5,126.8984 L695.5,135.4648 L654,150.3359 L695.5,143.4648 L695.5,152.0313 A0,0 0 0 0 695.5,152.0313 L1101.5,152.0313 A0,0 0 0 0 1101.5,152.0313 L1101.5,136.8984 L1091.5,126.8984 L695.5,126.8984 A0,0 0 0 0 695.5,126.8984 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M1091.5,126.8984 L1091.5,136.8984 L1101.5,136.8984 L1091.5,126.8984 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="707" cy="139.5313" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="374" x="712.5" y="143.9653">получает описание сессии для установки соединения.</text><path d="M695.5,162.0313 L695.5,170.5977 L610,166.6328 L695.5,178.5977 L695.5,187.1641 A0,0 0 0 0 695.5,187.1641 L1148.5,187.1641 A0,0 0 0 0 1148.5,187.1641 L1148.5,172.0313 L1138.5,162.0313 L695.5,162.0313 A0,0 0 0 0 695.5,162.0313 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M1138.5,162.0313 L1138.5,172.0313 L1148.5,172.0313 L1138.5,162.0313 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="707" cy="174.6641" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="421" x="712.5" y="179.0981">получает список ICE кандидатов для установки соединения.</text><path d="M695.5,197.1641 L695.5,205.7305 L609,182.9297 L695.5,213.7305 L695.5,222.2969 A0,0 0 0 0 695.5,222.2969 L959.5,222.2969 A0,0 0 0 0 959.5,222.2969 L959.5,207.1641 L949.5,197.1641 L695.5,197.1641 A0,0 0 0 0 695.5,197.1641 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M949.5,197.1641 L949.5,207.1641 L959.5,207.1641 L949.5,197.1641 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="707" cy="209.7969" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="232" x="712.5" y="214.231">удаляет пользователя из звонка.</text><path d="M695.5,232.2969 L695.5,240.8633 L567,207.2266 L695.5,248.8633 L695.5,257.4297 A0,0 0 0 0 695.5,257.4297 L1008.5,257.4297 A0,0 0 0 0 1008.5,257.4297 L1008.5,242.2969 L998.5,232.2969 L695.5,232.2969 A0,0 0 0 0 695.5,232.2969 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M998.5,232.2969 L998.5,242.2969 L1008.5,242.2969 L998.5,232.2969 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="707" cy="244.9297" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="281" x="712.5" y="249.3638">добавляет медиа данные для отправки.</text><!--MD5=[efeb37530bc865789114484467f1f84e]
class SignalingModule--><g id="elem_SignalingModule"><rect codeLine="44" fill="#F1F1F1" height="145.7813" id="SignalingModule" rx="2.5" ry="2.5" style="stroke:#181818;stroke-width:0.5;" width="254" x="405" y="491.5"/><ellipse cx="471.25" cy="507.5" fill="#ADD1B2" rx="11" ry="11" style="stroke:#181818;stroke-width:1.0;"/><path d="M474.2188,513.1406 Q473.6406,513.4375 473,513.5781 Q472.3594,513.7344 471.6563,513.7344 Q469.1563,513.7344 467.8281,512.0938 Q466.5156,510.4375 466.5156,507.3125 Q466.5156,504.1875 467.8281,502.5313 Q469.1563,500.875 471.6563,500.875 Q472.3594,500.875 473,501.0313 Q473.6563,501.1875 474.2188,501.4844 L474.2188,504.2031 Q473.5938,503.625 473,503.3594 Q472.4063,503.0781 471.7813,503.0781 Q470.4375,503.0781 469.75,504.1563 Q469.0625,505.2188 469.0625,507.3125 Q469.0625,509.4063 469.75,510.4844 Q470.4375,511.5469 471.7813,511.5469 Q472.4063,511.5469 473,511.2813 Q473.5938,511 474.2188,510.4219 L474.2188,513.1406 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="113" x="491.75" y="512.3467">SignalingModule</text><line style="stroke:#181818;stroke-width:0.5;" x1="406" x2="658" y1="523.5" y2="523.5"/><line style="stroke:#181818;stroke-width:0.5;" x1="406" x2="658" y1="531.5" y2="531.5"/><ellipse cx="416" cy="545.1484" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="176" x="425" y="548.4951">handleConnectionEvent()</text><ellipse cx="416" cy="561.4453" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="120" x="425" y="564.792">handleJoinEvent()</text><ellipse cx="416" cy="577.7422" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="210" x="425" y="581.0889">handleUpdateUserDataEvent()</text><ellipse cx="416" cy="594.0391" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="186" x="425" y="597.3857">handleRelayICECandidate()</text><ellipse cx="416" cy="610.3359" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="228" x="425" y="613.6826">handleRelaySessionDescription()</text><ellipse cx="416" cy="626.6328" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="175" x="425" y="629.9795">handleDisconnectEvent()</text></g><path d="M22,469 L22,509.2656 A0,0 0 0 0 22,509.2656 L370,509.2656 A0,0 0 0 0 370,509.2656 L370,493.1328 L409,559.9453 L370,485.1328 L370,479 L360,469 L22,469 A0,0 0 0 0 22,469 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M360,469 L360,479 L370,479 L360,469 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="33.5" cy="481.6328" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="279" x="39" y="486.0669">cохраняет информацию о пользователе;</text><ellipse cx="33.5" cy="496.7656" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="316" x="39" y="501.1997">добавляет пользователя в канал для звонка.</text><path d="M22,519.2656 L22,544.3984 A0,0 0 0 0 22,544.3984 L327,544.3984 A0,0 0 0 0 327,544.3984 L327,537.2656 L409,576.2422 L327,529.2656 L327,529.2656 L317,519.2656 L22,519.2656 A0,0 0 0 0 22,519.2656 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M317,519.2656 L317,529.2656 L327,529.2656 L317,519.2656 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="33.5" cy="531.8984" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="273" x="39" y="536.3325">обновить информацию о пользователе.</text><path d="M22,554.3984 L22,579.5313 A0,0 0 0 0 22,579.5313 L358,579.5313 A0,0 0 0 0 358,579.5313 L358,572.3984 L409,592.5391 L358,564.3984 L358,564.3984 L348,554.3984 L22,554.3984 A0,0 0 0 0 22,554.3984 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M348,554.3984 L348,564.3984 L358,564.3984 L348,554.3984 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="33.5" cy="567.0313" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="304" x="39" y="571.4653">обработать пару активных ICE кандидатов.</text><path d="M22,589.5313 L22,614.6641 A0,0 0 0 0 22,614.6641 L256,614.6641 A0,0 0 0 0 256,614.6641 L256,607.5313 L409,608.8359 L256,599.5313 L256,599.5313 L246,589.5313 L22,589.5313 A0,0 0 0 0 22,589.5313 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M246,589.5313 L246,599.5313 L256,599.5313 L246,589.5313 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="33.5" cy="602.1641" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="202" x="39" y="606.5981">обработать описание сессии.</text><path d="M22,624.6641 L22,649.7969 A0,0 0 0 0 22,649.7969 L286,649.7969 A0,0 0 0 0 286,649.7969 L286,642.6641 L409,625.1328 L286,634.6641 L286,634.6641 L276,624.6641 L22,624.6641 A0,0 0 0 0 22,624.6641 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M276,624.6641 L276,634.6641 L286,634.6641 L276,624.6641 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><ellipse cx="33.5" cy="637.2969" fill="#000000" rx="2.5" ry="2.5" style="stroke:#000000;stroke-width:0.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="232" x="39" y="641.731">удалить пользователя из звонка.</text><!--MD5=[f312e9907a002a216a713ef22e20542b]
class LoggerModule--><g id="elem_LoggerModule"><rect codeLine="76" fill="#F1F1F1" height="113.1875" id="LoggerModule" rx="2.5" ry="2.5" style="stroke:#181818;stroke-width:0.5;" width="131" x="761.5" y="744"/><ellipse cx="776.5" cy="760" fill="#ADD1B2" rx="11" ry="11" style="stroke:#181818;stroke-width:1.0;"/><path d="M779.4688,765.6406 Q778.8906,765.9375 778.25,766.0781 Q777.6094,766.2344 776.9063,766.2344 Q774.4063,766.2344 773.0781,764.5938 Q771.7656,762.9375 771.7656,759.8125 Q771.7656,756.6875 773.0781,755.0313 Q774.4063,753.375 776.9063,753.375 Q777.6094,753.375 778.25,753.5313 Q778.9063,753.6875 779.4688,753.9844 L779.4688,756.7031 Q778.8438,756.125 778.25,755.8594 Q777.6563,755.5781 777.0313,755.5781 Q775.6875,755.5781 775,756.6563 Q774.3125,757.7188 774.3125,759.8125 Q774.3125,761.9063 775,762.9844 Q775.6875,764.0469 777.0313,764.0469 Q777.6563,764.0469 778.25,763.7813 Q778.8438,763.5 779.4688,762.9219 L779.4688,765.6406 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="99" x="790.5" y="764.8467">LoggerModule</text><line style="stroke:#181818;stroke-width:0.5;" x1="762.5" x2="891.5" y1="776" y2="776"/><line style="stroke:#181818;stroke-width:0.5;" x1="762.5" x2="891.5" y1="784" y2="784"/><ellipse cx="772.5" cy="797.6484" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="35" x="781.5" y="800.9951">info()</text><ellipse cx="772.5" cy="813.9453" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="43" x="781.5" y="817.292">error()</text><ellipse cx="772.5" cy="830.2422" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="43" x="781.5" y="833.5889">warn()</text><ellipse cx="772.5" cy="846.5391" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="55" x="781.5" y="849.8857">debug()</text></g><!--MD5=[e24d4e0c1e85261a4ab1bfbd82a3f652]
class WebsocketModule--><g id="elem_WebsocketModule"><rect codeLine="83" fill="#F1F1F1" height="64.2969" id="WebsocketModule" rx="2.5" ry="2.5" style="stroke:#181818;stroke-width:0.5;" width="161" x="295.5" y="768.5"/><ellipse cx="310.5" cy="784.5" fill="#ADD1B2" rx="11" ry="11" style="stroke:#181818;stroke-width:1.0;"/><path d="M313.4688,790.1406 Q312.8906,790.4375 312.25,790.5781 Q311.6094,790.7344 310.9063,790.7344 Q308.4063,790.7344 307.0781,789.0938 Q305.7656,787.4375 305.7656,784.3125 Q305.7656,781.1875 307.0781,779.5313 Q308.4063,777.875 310.9063,777.875 Q311.6094,777.875 312.25,778.0313 Q312.9063,778.1875 313.4688,778.4844 L313.4688,781.2031 Q312.8438,780.625 312.25,780.3594 Q311.6563,780.0781 311.0313,780.0781 Q309.6875,780.0781 309,781.1563 Q308.3125,782.2188 308.3125,784.3125 Q308.3125,786.4063 309,787.4844 Q309.6875,788.5469 311.0313,788.5469 Q311.6563,788.5469 312.25,788.2813 Q312.8438,788 313.4688,787.4219 L313.4688,790.1406 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="129" x="324.5" y="789.3467">WebsocketModule</text><line style="stroke:#181818;stroke-width:0.5;" x1="296.5" x2="455.5" y1="800.5" y2="800.5"/><ellipse cx="306.5" cy="814.1484" fill="none" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="43" x="315.5" y="817.4951">server</text><line style="stroke:#181818;stroke-width:0.5;" x1="296.5" x2="455.5" y1="824.7969" y2="824.7969"/></g><!--MD5=[af4739f614ec4ef28c5e05da35d2fcc4]
class ConfigModule--><g id="elem_ConfigModule"><rect codeLine="87" fill="#F1F1F1" height="96.8906" id="ConfigModule" rx="2.5" ry="2.5" style="stroke:#181818;stroke-width:0.5;" width="127" x="442.5" y="918"/><ellipse cx="457.5" cy="934" fill="#ADD1B2" rx="11" ry="11" style="stroke:#181818;stroke-width:1.0;"/><path d="M460.4688,939.6406 Q459.8906,939.9375 459.25,940.0781 Q458.6094,940.2344 457.9063,940.2344 Q455.4063,940.2344 454.0781,938.5938 Q452.7656,936.9375 452.7656,933.8125 Q452.7656,930.6875 454.0781,929.0313 Q455.4063,927.375 457.9063,927.375 Q458.6094,927.375 459.25,927.5313 Q459.9063,927.6875 460.4688,927.9844 L460.4688,930.7031 Q459.8438,930.125 459.25,929.8594 Q458.6563,929.5781 458.0313,929.5781 Q456.6875,929.5781 456,930.6563 Q455.3125,931.7188 455.3125,933.8125 Q455.3125,935.9063 456,936.9844 Q456.6875,938.0469 458.0313,938.0469 Q458.6563,938.0469 459.25,937.7813 Q459.8438,937.5 460.4688,936.9219 L460.4688,939.6406 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="95" x="471.5" y="938.8467">ConfigModule</text><line style="stroke:#181818;stroke-width:0.5;" x1="443.5" x2="568.5" y1="950" y2="950"/><line style="stroke:#181818;stroke-width:0.5;" x1="443.5" x2="568.5" y1="958" y2="958"/><ellipse cx="453.5" cy="971.6484" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="61" x="462.5" y="974.9951">getPort()</text><ellipse cx="453.5" cy="987.9453" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="91" x="462.5" y="991.292">getApiPrefix()</text><ellipse cx="453.5" cy="1004.2422" fill="#84BE84" rx="3" ry="3" style="stroke:#038048;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="93" x="462.5" y="1007.5889">getSwagger()</text></g><!--MD5=[4b1bb1b7d0fd1e81bf89b805e1809d9e]
class StaticModule--><g id="elem_StaticModule"><rect codeLine="93" fill="#F1F1F1" height="48" id="StaticModule" rx="2.5" ry="2.5" style="stroke:#181818;stroke-width:0.5;" width="121" x="139.5" y="776.5"/><ellipse cx="154.5" cy="792.5" fill="#ADD1B2" rx="11" ry="11" style="stroke:#181818;stroke-width:1.0;"/><path d="M157.4688,798.1406 Q156.8906,798.4375 156.25,798.5781 Q155.6094,798.7344 154.9063,798.7344 Q152.4063,798.7344 151.0781,797.0938 Q149.7656,795.4375 149.7656,792.3125 Q149.7656,789.1875 151.0781,787.5313 Q152.4063,785.875 154.9063,785.875 Q155.6094,785.875 156.25,786.0313 Q156.9063,786.1875 157.4688,786.4844 L157.4688,789.2031 Q156.8438,788.625 156.25,788.3594 Q155.6563,788.0781 155.0313,788.0781 Q153.6875,788.0781 153,789.1563 Q152.3125,790.2188 152.3125,792.3125 Q152.3125,794.4063 153,795.4844 Q153.6875,796.5469 155.0313,796.5469 Q155.6563,796.5469 156.25,796.2813 Q156.8438,796 157.4688,795.4219 L157.4688,798.1406 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="89" x="168.5" y="797.3467">StaticModule</text><line style="stroke:#181818;stroke-width:0.5;" x1="140.5" x2="259.5" y1="808.5" y2="808.5"/><line style="stroke:#181818;stroke-width:0.5;" x1="140.5" x2="259.5" y1="816.5" y2="816.5"/></g><g id="elem_GMN2571"><path d="M604.5,946.5 L604.5,986.7656 A0,0 0 0 0 604.5,986.7656 L893.5,986.7656 A0,0 0 0 0 893.5,986.7656 L893.5,956.5 L883.5,946.5 L762.21,946.5 L800.59,857.02 L754.21,946.5 L604.5,946.5 A0,0 0 0 0 604.5,946.5 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M883.5,946.5 L883.5,956.5 L893.5,956.5 L883.5,946.5 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="268" x="610.5" y="963.5669">Модуль отвечает за логирование HTTP</text><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="215" x="610.5" y="978.6997">запросов и WebSocket событий.</text></g><g id="elem_GMN2574"><path d="M400.5,1076 L400.5,1116.2656 A0,0 0 0 0 400.5,1116.2656 L611.5,1116.2656 A0,0 0 0 0 611.5,1116.2656 L611.5,1086 L601.5,1076 L510,1076 L506,1015.34 L502,1076 L400.5,1076 A0,0 0 0 0 400.5,1076 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M601.5,1076 L601.5,1086 L611.5,1086 L601.5,1076 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="115" x="406.5" y="1093.0669">Модуль сборщик</text><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="190" x="406.5" y="1108.1997">конфигурации приложения.</text></g><g id="elem_GMN2577"><path d="M123,946.5 L123,986.7656 A0,0 0 0 0 123,986.7656 L407,986.7656 A0,0 0 0 0 407,986.7656 L407,956.5 L397,946.5 L261.29,946.5 L209.18,824.65 L253.29,946.5 L123,946.5 A0,0 0 0 0 123,946.5 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M397,946.5 L397,956.5 L407,956.5 L397,946.5 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="259" x="129" y="963.5669">Модуль раздает статику для работы</text><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="216" x="129" y="978.6997">клиентской части приложения.</text></g><g id="elem_GMN2580"><path d="M492,780.5 L492,796.5 L456.55,800.5 L492,804.5 L492,820.7656 A0,0 0 0 0 492,820.7656 L726,820.7656 A0,0 0 0 0 726,820.7656 L726,790.5 L716,780.5 L492,780.5 A0,0 0 0 0 492,780.5 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><path d="M716,780.5 L716,790.5 L726,790.5 L716,780.5 " fill="#FEFFDD" style="stroke:#181818;stroke-width:0.5;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="209" x="498" y="797.5669">Инкапсулирует логику работы</text><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="186" x="498" y="812.6997">с WebSocket в приложении.</text></g><g id="elem_Websocket"><polygon fill="#F1F1F1" points="532,347,544,359,532,371,520,359,532,347" style="stroke:#181818;stroke-width:0.5;"/></g><!--MD5=[97446387271ec4b009169c569d99cded]
reverse link SignalingModule to LoggerModule--><g id="link_SignalingModule_LoggerModule"><path codeLine="120" d="M669.68,644.88 C695.39,662.06 721.29,681.1 744,701 C758.55,713.75 772.74,729.13 785.16,743.91 " fill="none" id="SignalingModule-backto-LoggerModule" style="stroke:#181818;stroke-width:1.0;"/><polygon fill="none" points="658.68,637.63,661.4879,644.2719,668.6989,644.2346,665.891,637.5926,658.68,637.63" style="stroke:#181818;stroke-width:1.0;"/></g><!--MD5=[a53e46a8b6554cf561994c8c341f4071]
reverse link SignalingModule to WebsocketModule--><g id="link_SignalingModule_WebsocketModule"><path codeLine="121" d="M476.62,648.57 C448.96,690.06 417.15,737.78 396.83,768.26 " fill="none" id="SignalingModule-backto-WebsocketModule" style="stroke:#181818;stroke-width:1.0;"/><polygon fill="none" points="483.92,637.62,477.2644,640.3955,477.2666,647.6066,483.9222,644.8311,483.92,637.62" style="stroke:#181818;stroke-width:1.0;"/></g><!--MD5=[8eec769d78c7f445c695428d03e019e1]
reverse link WebsocketModule to ConfigModule--><g id="link_WebsocketModule_ConfigModule"><path codeLine="122" d="M408.98,843.1 C427.05,865.9 449.52,894.24 468.28,917.92 " fill="none" id="WebsocketModule-backto-ConfigModule" style="stroke:#181818;stroke-width:1.0;"/><polygon fill="none" points="400.76,832.73,401.3576,839.9163,408.2209,842.1287,407.6233,834.9424,400.76,832.73" style="stroke:#181818;stroke-width:1.0;"/></g><!--MD5=[ec2b02f940988632ac695b2c3ddad7aa]
link App to Websocket--><g id="link_App_Websocket"><path codeLine="123" d="M532,268 C532,300.23 532,330.91 532,346.78 " fill="none" id="App-Websocket" style="stroke:#181818;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="69" x="533" y="313.0669">Websocket</text></g><!--MD5=[965d7fc78af96b8803b840a9a76516c7]
link Websocket to SignalingModule--><g id="link_Websocket_SignalingModule"><path codeLine="124" d="M532,371.23 C532,393.89 532,446.74 532,491.31 " fill="none" id="Websocket-SignalingModule" style="stroke:#181818;stroke-width:1.0;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="69" x="533" y="414.0669">Websocket</text></svg>