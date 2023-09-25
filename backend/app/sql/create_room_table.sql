create table dbp.rooms (
    room_id     varchar(36)                     not null,
    room_name   varchar(36)                     not null,
    passhash    varchar(64)                     not null,    
    capacity    int                             not null default 1,
    ena         int                             not null default 1,
    del         int                             not null default 0,
    expire_at   timestamp                       not null,
    updated_at  timestamp                       not null default current_timestamp on update current_timestamp,
    created_at  timestamp                       not null default current_timestamp,
    primary key(room_id)
);

create table dbd.rooms (
    room_id     varchar(36)                     not null,
    room_name   varchar(36)                     not null,
    passhash    varchar(64)                     not null,    
    capacity    int                             not null default 1,
    ena         int                             not null default 1,
    del         int                             not null default 0,
    expire_at   timestamp                       not null,
    updated_at  timestamp                       not null default current_timestamp on update current_timestamp,
    created_at  timestamp                       not null default current_timestamp,
    primary key(room_id)
);