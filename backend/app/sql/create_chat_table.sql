create table dbp.chathist (
    id          int         auto_increment      not null,
    user_id     varchar(36)                     not null,
    user_name   text                            not null, 
    room_id     varchar(36)                     null,    
    msg         text                            not null,             
    ip          varchar(39)                     null,   
    ena         int                             not null default 1,    
    del         int                             not null default 0,    
    created_at  timestamp                       not null default current_timestamp,    
    primary key(id)
);

create table dbd.chathist (
    id          int         auto_increment      not null,
    user_id     varchar(36)                     not null,
    user_name   text                            not null, 
    room_id     varchar(36)                     null,    
    msg         text                            not null,             
    ip          varchar(39)                     null,  
    ena         int                             not null default 1,    
    del         int                             not null default 0,    
    created_at  timestamp                       not null default current_timestamp,    
    primary key(id)
);