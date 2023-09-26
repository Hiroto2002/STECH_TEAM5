create table dbp.access (
    id          int             auto_increment  not null,
    rooms       varchar(32)                     not null,
    ipv6        varchar(39)                     null,
    ipv4        varchar(15)                     null,
    active      int                             not null default 1,
    ena         int                             not null default 1,
    del         int                             not null default 0,
    created_at  timestamp                       not null default current_timestamp,
    updated_at  timestamp                       not null default current_timestamp on update current_timestamp,
    primary key(id)
);

create table dbd.access (
    id          int             auto_increment  not null,
    rooms       varchar(32)                     not null,
    ipv6        varchar(39)                     null,
    ipv4        varchar(15)                     null,
    active      int                             not null default 1,
    ena         int                             not null default 1,
    del         int                             not null default 0,    
    created_at  timestamp                       not null default current_timestamp,
    updated_at  timestamp                       not null default current_timestamp on update current_timestamp,
    primary key(id)
);