# coding: utf-8
require 'digest'

# HashSHAを求めるクラス
class HashSHA
  class << self
    # SHA256を求める
    # @param str0 [String] 生成源
    # @return hash [String]
    def get256( str0 )
      salt = 'SaltMakesMeSad'
      salt_hash = Digest::SHA256.hexdigest( salt )
      str  = str0 + salt + salt_hash
      h    = Digest::SHA256.hexdigest( str )
      return h
    end 
    # SHA512を求める
    # @param str0 [String] 生成源
    # @return hash [String]
    def get512( str0 )
      salt = 'SaltMakesMeSad'
      salt_hash = Digest::SHA512.hexdigest( salt )
      str  = str0 + salt + salt_hash
      h    = Digest::SHA512.hexdigest( str )
      return h
    end 
  end
end