class NoteSerializer < ActiveModel::Serializer
  attributes :id, :subject, :content
end
