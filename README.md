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
