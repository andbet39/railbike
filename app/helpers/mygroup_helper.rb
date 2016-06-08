module MygroupHelper
  def isMember(group,user)

    if(Membership.find_by(group:group,user:user))
      true
    else
      false
    end
  end
end
